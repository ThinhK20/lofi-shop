namespace Lofi_Shop_API.Models.DTO
{
	public class CartInfoDTO : Cart
	{
		public string Name { get; set; }
		public string Description { get; set; }
		public double Rating { get; set; } = 0;
		public string Origin { get; set; }
		public string Material { get; set; }
		public string Style { get; set; }
		public string Sample { get; set; }
		public double Price { get; set; } = 0;
		public Guid SubCategory { get; set; }
		public int Orders { get; set; }
		public string PhotoUrl { get; set; }
		public string StripeId { get; set; }
	}
}
