using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lofi_Shop_API.Models
{
    public class ProductSize
    {
        [Key]
        [ForeignKey("Size")]
        public string SizeId { get; set; }
        [Key]
        [ForeignKey("Product")]
        public Guid ProductId { get; set; }
    }
}
