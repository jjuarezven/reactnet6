using System.ComponentModel.DataAnnotations;

namespace Api
{
    public record HouseDetailDto(int Id, [property: Required] string? Address, [property: Required] string? Country,
    string? Description, int Price, string? Photo);
}
