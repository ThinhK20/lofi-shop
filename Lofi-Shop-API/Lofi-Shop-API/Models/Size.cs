using System.ComponentModel.DataAnnotations;

namespace Lofi_Shop_API.Models
{
    public class Size
    {
        [Key]
        public string Id { get; set; }
        public string Description { get; set; }
    }
}
