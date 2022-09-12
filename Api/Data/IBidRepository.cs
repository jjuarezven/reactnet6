namespace Api
{
    public interface IBidRepository
    {
        Task<BidDto> Add(BidDto dto);
        Task<IEnumerable<BidDto>> Get(int houseId);
    }
}