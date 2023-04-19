using System.ComponentModel.DataAnnotations;

namespace Lofi_Shop_API.Models
{
    public class Users
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Username { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
        [Required]
        public string Phone { get; set; } = string.Empty;
        [Required]
        public string Avatar { get; set; } = string.Empty;
    }
}
