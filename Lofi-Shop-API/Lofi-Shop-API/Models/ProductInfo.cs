using Lofi_Shop_API.Models.DTO.Product;

namespace Lofi_Shop_API.Models
{
    public class ProductInfo : Product
    {
        public required List<ProductColorResultDTO> Colors { get; set; } = new List<ProductColorResultDTO>();

        public required List<ProductSize> Sizes { get; set; } = new List<ProductSize>();

        public required List<ProductPhoto> Photos { get; set; } = new List<ProductPhoto>();

    }
}
