using Lofi_Shop_API.Models.Body;
using System.ComponentModel.DataAnnotations;

namespace Lofi_Shop_API.Models
{
    public class Product : ProductBody
    {
        [Key]
        public required Guid Id { get; set; }

    }
}
