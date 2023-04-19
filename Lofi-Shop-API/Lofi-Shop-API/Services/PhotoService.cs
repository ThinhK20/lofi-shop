using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Lofi_Shop_API.Models;
using Lofi_Shop_API.Models.DTO;
using Lofi_Shop_API.Models.DTO.Product;

namespace Lofi_Shop_API.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly IConfiguration _configuration;
        private CloudinarySettings _cloudinarySettings;
        private Cloudinary _cloudinary;

        public PhotoService(IConfiguration configuration)
        {
            this._configuration = configuration;
            _cloudinarySettings = _configuration.GetSection("CloudinarySettings").Get<CloudinarySettings>();
            Account account = new Account(_cloudinarySettings.CloudName, _cloudinarySettings.ApiKey, _cloudinarySettings.ApiSecret);
            _cloudinary = new Cloudinary(account);
        }

        public ProfilePhoto UploadPhoto(ProfilePhotoUploadedDTO photoDTO)
        {
            var file = photoDTO.File;
            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        PublicId = Path.GetFileNameWithoutExtension(photoDTO.PublicId),
                    };
                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }
            ProfilePhoto profilePhoto = new ProfilePhoto
            {
                Description = photoDTO.Description,
                PublicId = photoDTO.PublicId,
                Url = uploadResult.Url.ToString(),
                DateAdded = photoDTO.DateAdded,
                UserId = photoDTO.UserId
            };

            return profilePhoto;
        }

        public ProductPhoto UploadPhoto(ProductPhotoUploadedDTO photoDTO)
        {
            var file = photoDTO.File;
            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                    };
                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }
            ProductPhoto productPhoto = new ProductPhoto
            {
                Description = photoDTO.Description,
                Url = uploadResult.Url.ToString(),
                ProductId = photoDTO.ProductId,
                PublicId = uploadResult.PublicId
            };


            return productPhoto;
        }
    }
}
