using Lofi_Shop_API.Models.Order;

namespace Lofi_Shop_API.Models
{
	public class InvoiceUser
	{
		public OrdersCreatedDTO ordersCreatedDTO { get; set; }
		public List<OrdersDetailsDTO> listDetails { get; set; }
	}
}
