using Microsoft.AspNetCore.Mvc;

namespace Lofi_Shop_API.Models.Order
{
	public class OrdersDetailsDTO
	{
		[FromForm]
		public Guid ProductId { get; set; }
		[FromForm]

		public double Price { get; set; }
		[FromForm]

		public int Quantity { get; set; }
	}
}
