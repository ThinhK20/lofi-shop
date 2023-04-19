namespace Lofi_Shop_API.Models.DTO.Product
{
    public class ProductPhotoUploadedDTO
    {
        public required string Description { get; set; }
        public required IFormFile File { get; set; }
        public required Guid ProductId { get; set; }
    }
}
