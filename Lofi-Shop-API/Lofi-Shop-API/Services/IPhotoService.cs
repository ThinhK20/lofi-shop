using Lofi_Shop_API.Models;
using Lofi_Shop_API.Models.DTO;
using Lofi_Shop_API.Models.DTO.Product;

namespace Lofi_Shop_API.Services
{
    public interface IPhotoService
    {
        public ProfilePhoto UploadPhoto(ProfilePhotoUploadedDTO photoDTO);
        public ProductPhoto UploadPhoto(ProductPhotoUploadedDTO photoDTO);

    }
}
