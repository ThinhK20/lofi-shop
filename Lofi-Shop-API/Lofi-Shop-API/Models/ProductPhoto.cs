using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lofi_Shop_API.Models
{
    public class ProductPhoto
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public DateTime DateAdded { get; set; } = DateTime.Now;
        [Required]
        public string Description { get; set; }
        [Required]
        public string PublicId { get; set; }
        [Required]
        public string Url { get; set; }
        [ForeignKey("Product")]
        public Guid ProductId { get; set; }
    }
}
