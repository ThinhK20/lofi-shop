using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lofi_Shop_API.Models
{
	public class Orders
	{
		[Key]
		public Guid Id { get; set; }
		[Required]
		[ForeignKey("Users")]
		public Guid UserId { get; set; }
		[Required]
		public double TotalPrice { get; set; }
		[Required]
		public string PaymentType { get; set; }
		public DateTime? CreatedDate { get; set; } = DateTime.Now;
	}
}
