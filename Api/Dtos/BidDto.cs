﻿using System.ComponentModel.DataAnnotations;

namespace Api
{
    public record BidDto(int Id, int HouseId, [property:Required] string Bidder, int Amount);
}
