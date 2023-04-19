using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lofi_Shop_API.Models
{
    public class SubCategories
    {
        [Key]
        public Guid Id { get; set; }
        [ForeignKey("Categories")]
        public Guid CategoriesId { get; set; }
        public string Name { get; set; }
    }
}
