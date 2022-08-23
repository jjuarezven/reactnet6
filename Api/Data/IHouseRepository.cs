namespace Api
{
    public interface IHouseRepository
    {
        Task<IEnumerable<HouseDto>> GetAll();
        Task<HouseDetailDto?> Get(int id);
    }
}
