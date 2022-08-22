namespace Api
{
    public interface IHouseRepository
    {
        Task<IEnumerable<HouseDto>> GetAll();
    }
}
