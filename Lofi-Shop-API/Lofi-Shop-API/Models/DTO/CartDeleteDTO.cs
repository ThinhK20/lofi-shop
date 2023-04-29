namespace Lofi_Shop_API.Models.DTO
{
	public class CartDeleteDTO
	{
		public required Guid ProductId { get; set; }
		public required Guid UserId { get; set; }
		public required string SizeId { get; set; }
		public required Guid ColorId { get; set; }
	}
}
