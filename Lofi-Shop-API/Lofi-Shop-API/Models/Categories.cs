using System.ComponentModel.DataAnnotations;

namespace Lofi_Shop_API.Models
{
    public class Categories
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
}
