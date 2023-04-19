using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lofi_Shop_API.Models
{
    public class ProfilePhoto
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public DateTime DateAdded { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string PublicId { get; set; }
        [Required]
        [ForeignKey("Users")]
        public Guid UserId { get; set; }
        [Required]
        public string Url { get; set; }
    }
}
