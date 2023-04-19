namespace Lofi_Shop_API.Models.DTO.Product
{
    public class ProductDTO
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string Origin { get; set; }
        public required string Material { get; set; }
        public required string Style { get; set; }
        public required string Sample { get; set; }
        public required double Price { get; set; } = 0;
        public required Guid SubCategory { get; set; }
        public required IFormFile File { get; set; }


    }
}
