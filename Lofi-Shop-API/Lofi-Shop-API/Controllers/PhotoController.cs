using Dapper;
using Lofi_Shop_API.Models;
using Lofi_Shop_API.Models.DTO;
using Lofi_Shop_API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Lofi_Shop_API.Controllers
{
    [Route("api/photo")]
    [ApiController]
    public class PhotoController : ControllerBase
    {
        private readonly IPhotoService _photoService;
        private readonly ISqlConnectionFactory _connectionFactory;
        public PhotoController(IPhotoService photoService, ISqlConnectionFactory connectionFactory)
        {
            _photoService = photoService;
            _connectionFactory = connectionFactory;
        }

        [HttpGet]
        public async Task<ActionResult<ProfilePhoto>> GetAllProfilePhotos()
        {
            try
            {
                await using SqlConnection connection = _connectionFactory.CreateConnection();
                var profilePhotos = await connection.QueryAsync<ProfilePhoto>("Select * from ProfilePhoto");
                return Ok(profilePhotos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpPost, Authorize]
        public async Task<IActionResult> AddImage([FromForm] ProfilePhotoUploadedDTO photoDTO)
        {
            try
            {
                var result = _photoService.UploadPhoto(photoDTO);
                if (result == null) { return BadRequest(result); }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        public override bool Equals(object? obj)
        {
            return obj is PhotoController controller &&
                   EqualityComparer<ISqlConnectionFactory>.Default.Equals(_connectionFactory, controller._connectionFactory);
        }
    }
}
