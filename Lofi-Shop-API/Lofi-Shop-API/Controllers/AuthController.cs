using AutoMapper;
using Dapper;
using Lofi_Shop_API.Models;
using Lofi_Shop_API.Models.DTO;
using Lofi_Shop_API.Models.DTO.Users;
using Lofi_Shop_API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Lofi_Shop_API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IPhotoService _photoService;
        private readonly IMapper _mapper;
        private readonly ISqlConnectionFactory _connectionFactory;

        public AuthController(IConfiguration configuration, IPhotoService photoService, IMapper mapper, ISqlConnectionFactory connectionFactory)
        {
            _configuration = configuration;
            _photoService = photoService;
            _mapper = mapper;
            _connectionFactory = connectionFactory;
        }


        [HttpPost("register")]
        public async Task<ActionResult<UsersResultDTO>> Register([FromForm] UsersDTO request)
        {
            Users user = new Users();
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
            user.Username = request.Username;
            user.Password = passwordHash;
            user.Phone = request.Phone;
            user.Email = request.Email;
            user.Id = Guid.NewGuid();
            ProfilePhotoUploadedDTO photoDTO = new ProfilePhotoUploadedDTO
            {
                File = request.Avatar,
                PublicId = Path.GetFileNameWithoutExtension(request.Avatar.FileName),
                UserId = user.Id,
                Description = "User-avatar-" + user.Username,
            };
            var result = _photoService.UploadPhoto(photoDTO);
            if (result == null)
            {
                return BadRequest("There has been something wrong when uploading your avatar.");
            }

            user.Avatar = result.Url.ToString();

            ProfilePhoto profilePhoto = new ProfilePhoto
            {
                DateAdded = DateTime.Now,
                Description = photoDTO.Description,
                PublicId = photoDTO.PublicId,
                UserId = user.Id,
                Url = user.Avatar
            };

            await using SqlConnection connection = _connectionFactory.CreateConnection();

            string queryString_user = "INSERT INTO Users (Id, Email, Avatar, Password, Phone, Username)" +
                 " VALUES(@Id, @Email, @Avatar, @Password, @Phone, @Username)";
            string queryString_photo = "INSERT INTO ProfilePhoto (DateAdded, Description, PublicId, Url, UserId)" +
          " VALUES(@DateAdded, @Description, @PublicId, @Url, @UserId)";
            await connection.ExecuteAsync(queryString_user, user);
            await connection.ExecuteAsync(queryString_photo, profilePhoto);

            var userResultDTO = _mapper.Map<UsersResultDTO>(user);

            return Ok(new
            {
                profilePhoto,
                user = userResultDTO,
            });

        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login([FromForm] UsersLoginDTO request)
        {
            await using SqlConnection connection = _connectionFactory.CreateConnection();
            try
            {
                string queryString = "SELECT * FROM Users WHERE Email = @Email";
                var user = await connection.QueryFirstAsync<Users>(queryString, new { Email = request.Email });
                if (user == null) return BadRequest("User not found.");

                if (!BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
                {
                    return BadRequest("Wrong password.");
                }
                string token = CreateToken(user);
                var userResultDTO = _mapper.Map<UsersResultDTO>(user);

                return Ok(new
                {
                    user = userResultDTO,
                    token,
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


        private string CreateToken(Users user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.Role, "Admin"),
                new Claim(ClaimTypes.Role, "User")
        };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds
                );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }


    }
}
