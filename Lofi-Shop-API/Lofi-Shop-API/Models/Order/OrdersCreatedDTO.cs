namespace Lofi_Shop_API.Models.Order
{
	public class OrdersCreatedDTO
	{
		public Guid UserId { get; set; }
		public double TotalPrice { get; set; }
		public string PaymentType { get; set; }
	}
}
