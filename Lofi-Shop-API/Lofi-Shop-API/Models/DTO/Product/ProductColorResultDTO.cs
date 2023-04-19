namespace Lofi_Shop_API.Models.DTO.Product
{
    public class ProductColorResultDTO
    {
        public Guid ProductId { get; set; }
        public Guid ColorId { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
    }
}
