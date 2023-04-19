using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lofi_Shop_API.Models
{
    public class ProductDiscount
    {
        [Key]
        [ForeignKey("Product")]
        public Guid ProductId { get; set; }
        [Key]
        [ForeignKey("Discount")]
        public Guid DiscountId { get; set; }
    }
}
