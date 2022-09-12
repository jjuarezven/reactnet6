using Microsoft.AspNetCore.Mvc;
using MiniValidation;

namespace Api
{
    public static class WebApplicationBidExtensions
    {
        public static void MapBidEndpoints(this WebApplication app)
        {
            app.MapGet("/house/{houseId:int}/bids", async (int houseId, IHouseRepository houseRepo, IBidRepository bidRepo) =>
            {
                var house = await houseRepo.Get(houseId);
                if (house is null)
                {
                    return Results.Problem($"House with ID {houseId} not found", statusCode: StatusCodes.Status404NotFound);
                }

                var bids = await bidRepo.Get(houseId);
                return Results.Ok(bids);
            }).ProducesProblem(StatusCodes.Status404NotFound).Produces<HouseDetailDto>(StatusCodes.Status200OK);

            app.MapPost("/house/{houseId:int}/bids", async (int houseId, [FromBody] BidDto dto, IBidRepository bidRepo) =>
            {
                if (dto.HouseId != houseId)
                {
                    return Results.Problem("No match", statusCode: StatusCodes.Status400BadRequest);
                }

                if (!MiniValidator.TryValidate(dto, out var errors))
                {
                    return Results.ValidationProblem(errors);
                }

                var newBid = await bidRepo.Add(dto);
                return Results.Created($"/houses/{newBid.HouseId}/bids", newBid);
            }).Produces<BidDto>(StatusCodes.Status201Created).ProducesValidationProblem(StatusCodes.Status400BadRequest);
        }
    }
}
