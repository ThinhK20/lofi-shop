namespace Lofi_Shop_API.Models.DTO
{
    public class ProfilePhotoUploadedDTO
    {
        public required Guid UserId { get; set; }
        public required string PublicId { get; set; }
        public DateTime DateAdded { get; set; } = DateTime.Now;
        public string Description { get; set; } = string.Empty;
        public required IFormFile File { get; set; }
    }
}
