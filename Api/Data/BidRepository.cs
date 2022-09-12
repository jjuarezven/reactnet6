using Microsoft.EntityFrameworkCore;

namespace Api
{
    public class BidRepository : IBidRepository
    {
        private readonly HouseDbContext _context;

        public BidRepository(HouseDbContext context)
        {
            this._context = context;
        }

        public async Task<IEnumerable<BidDto>> Get(int houseId)
        {
            return await _context.Bids.Where(b => b.HouseId == houseId).Select(b => new BidDto(b.Id, b.HouseId, b.Bidder, b.Amount)).ToListAsync();
        }

        public async Task<BidDto> Add(BidDto dto)
        {
            var entity = new BidEntity
            {
                HouseId = dto.HouseId,
                Bidder = dto.Bidder,
                Amount = dto.Amount
            };
            await _context.Bids.AddAsync(entity);
            await _context.SaveChangesAsync();
            return new BidDto(entity.Id, entity.HouseId, entity.Bidder, entity.Amount);
        }
    }
}
