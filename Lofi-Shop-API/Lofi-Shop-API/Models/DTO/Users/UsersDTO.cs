namespace Lofi_Shop_API.Models.DTO.Users
{
    public class UsersDTO
    {
        public required string Username { get; set; }
        public required string Password { get; set; }

        public required string Email { get; set; }
        public required string Phone { get; set; }
        public required IFormFile Avatar { get; set; }
    }
}
