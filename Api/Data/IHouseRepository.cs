namespace Api
{
    public interface IHouseRepository
    {
        Task<IEnumerable<HouseDto>> GetAll();
        Task<HouseDetailDto?> Get(int id);
        Task<HouseDetailDto> Add(HouseDetailDto dto);
        Task<HouseDetailDto> Update(HouseDetailDto dto);
        Task Delete(int id);
    }
}
