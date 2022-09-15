using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MiniValidation;

namespace Api
{
    public static class WebApplicationHouseExtensions
    {
        public static void MapHouseEndpoints(this WebApplication app)
        {
            app.MapGet("/houses", [Authorize] (IHouseRepository repo) =>
            {
                return repo.GetAll();
            }).Produces<HouseDetailDto>(StatusCodes.Status200OK);

            app.MapGet("/houses/{houseId:int}", [Authorize] async (int houseId, IHouseRepository repo) =>
            {
                var house = await repo.Get(houseId);
                if (house is null)
                {
                    return Results.Problem($"House with ID {houseId} not found", statusCode: StatusCodes.Status404NotFound);
                }
                return Results.Ok(house);
            }).ProducesProblem(StatusCodes.Status404NotFound).Produces<HouseDetailDto>(StatusCodes.Status200OK);

            app.MapPost("/houses", [Authorize("admin")] async ([FromBody] HouseDetailDto dto, IHouseRepository repo) =>
            {
                if (!MiniValidator.TryValidate(dto, out var errors))
                {
                    return Results.ValidationProblem(errors);
                }
                var newHouse = await repo.Add(dto);
                return Results.Created($"/house/{newHouse.Id}", newHouse);
            }).Produces<HouseDetailDto>(StatusCodes.Status201Created).ProducesValidationProblem(StatusCodes.Status400BadRequest);

            app.MapPut("/houses", [Authorize] async ([FromBody] HouseDetailDto dto, IHouseRepository repo) =>
            {
                if (!MiniValidator.TryValidate(dto, out var errors))
                {
                    return Results.ValidationProblem(errors);
                }
                if (await repo.Get(dto.Id) is null)
                {
                    return Results.Problem($"House {dto.Id} not found", statusCode: StatusCodes.Status404NotFound);
                }
                var updatedHouse = await repo.Update(dto);
                return Results.Ok(updatedHouse);
            }).ProducesProblem(StatusCodes.Status404NotFound).ProducesValidationProblem().Produces<HouseDetailDto>(StatusCodes.Status200OK);

            app.MapDelete("/houses/{houseId:int}", [Authorize] async (int houseId, IHouseRepository repo) =>
            {
                if (await repo.Get(houseId) is null)
                {
                    return Results.Problem($"House {houseId} not found", statusCode: StatusCodes.Status404NotFound);
                }
                await repo.Delete(houseId);
                return Results.Ok();
            }).ProducesProblem(StatusCodes.Status404NotFound).Produces<HouseDetailDto>(StatusCodes.Status200OK);
        }
    }
}
