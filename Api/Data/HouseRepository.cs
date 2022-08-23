using Microsoft.EntityFrameworkCore;

namespace Api
{
    public class HouseRepository : IHouseRepository
    {
        private readonly HouseDbContext _context;

        public HouseRepository(HouseDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<HouseDto>> GetAll()
        {
            return await _context.Houses.Select(x => new HouseDto(x.Id, x.Address, x.Country, x.Price)).ToListAsync();
        }

        public async Task<HouseDetailDto?> Get(int id)
        {
            var house = await _context.Houses.SingleOrDefaultAsync(x => x.Id == id);
            return house is not null ? new HouseDetailDto(house.Id, house.Address, house.Country, house.Description, house.Price, house.Photo) : null;
        }
    }
}
