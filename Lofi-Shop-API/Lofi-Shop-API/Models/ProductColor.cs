using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lofi_Shop_API.Models
{
    public class ProductColor
    {
        [Key]
        [ForeignKey("Product")]
        public Guid ProductId { get; set; }
        [Key]
        [ForeignKey("Color")]
        public Guid ColorId { get; set; }

        public string Description { get; set; } = string.Empty;
    }
}
