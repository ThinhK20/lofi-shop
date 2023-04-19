using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lofi_Shop_API.Models
{
    public class OrdersDetails
    {
        [Key]
        [ForeignKey("Orders")]
        public Guid OrderID { get; set; }
        [Key]
        [ForeignKey("Product")]
        public Guid ProductId { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public int Quantity { get; set; }

    }
}
