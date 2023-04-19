namespace Lofi_Shop_API.Models.DTO.Product
{
    public class ProductColorDTO
    {
        public required Guid ProductId { get; set; }
        public required Guid ColorId { get; set; }
        public string Description { get; set; } = string.Empty;
    }
}
