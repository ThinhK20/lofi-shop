using System.ComponentModel.DataAnnotations;

namespace Lofi_Shop_API.Models
{
    public class Color
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; } = string.Empty;
    }
}
