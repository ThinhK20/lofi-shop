using System.ComponentModel.DataAnnotations;

namespace Lofi_Shop_API.Models
{
    public class Discount
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public double DiscountPrice { get; set; }
    }
}
