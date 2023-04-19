using System.ComponentModel.DataAnnotations;

namespace Lofi_Shop_API.Models.Body
{
    public class ProductBody
    {
        [Required]
        public required string Name { get; set; }
        [Required]
        public required string Description { get; set; }
        [Required]
        public required double Rating { get; set; } = 0;
        [Required]
        public required string Origin { get; set; }
        [Required]
        public required string Material { get; set; }
        [Required]
        public required string Style { get; set; }
        [Required]
        public required string Sample { get; set; }
        [Required]
        public required double Price { get; set; } = 0;
        [Required]
        public required Guid SubCategory { get; set; }
        [Required]
        public required int Orders { get; set; }
        [Required]
        public required string PhotoUrl { get; set; }
    }
}
