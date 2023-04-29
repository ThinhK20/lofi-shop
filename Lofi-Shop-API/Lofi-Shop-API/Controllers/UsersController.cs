using Dapper;
using Lofi_Shop_API.Models;
using Lofi_Shop_API.Models.DTO;
using Lofi_Shop_API.Models.DTO.Users;
using Lofi_Shop_API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Lofi_Shop_API.Controllers
{
	[Route("api/users")]
	[ApiController]
	public class UsersController : ControllerBase
	{
		private readonly ISqlConnectionFactory _connectionFactory;

		public UsersController(IConfiguration configuration, ISqlConnectionFactory connectionFactory)
		{
			_connectionFactory = connectionFactory;
		}

		[HttpGet]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<ActionResult<List<Users>>> GetAllUsers()
		{
			await using SqlConnection connection = _connectionFactory.CreateConnection();

			var users = await connection.QueryAsync<Users>("Select * from Users");
			return Ok(users);
		}

		[HttpGet("{id:Guid}")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		public async Task<ActionResult<Users>> GetUser([FromRoute] Guid id)
		{
			await using SqlConnection connection = _connectionFactory.CreateConnection();
			var user = await connection.QueryFirstAsync<Users>("Select * from Users where Id = @Id", new { Id = id });
			return Ok(user);
		}

		[HttpPost]
		public async Task<IActionResult> CreatedUser([FromBody] UsersDTO userDTO)
		{
			if (userDTO == null)
			{
				return BadRequest();
			}
			await using SqlConnection connection = _connectionFactory.CreateConnection();
			string queryString = "INSERT INTO Users (Email, Avatar, Password, Phone, Username)" +
				 " VALUES(@Email, @Avatar, @Password, @Phone, @Username)";
			await connection.ExecuteAsync(queryString, userDTO);
			return Ok(userDTO);
		}


		[HttpDelete("{id:Guid}")]
		public async Task<IActionResult> DeleteUser([FromRoute] Guid id)
		{
			await using SqlConnection connection = _connectionFactory.CreateConnection();
			string queryString = "DELETE FROM Users where Id = @Id";
			await connection.ExecuteAsync(queryString, new { Id = id });
			return NoContent();
		}

		[HttpGet("cart/{id:Guid}")]
		public async Task<IActionResult> GetUserCart([FromRoute] Guid id)
		{
			await using SqlConnection connection = _connectionFactory.CreateConnection();
			try
			{
				string queryStr = "Select ProductId, Quantity, Product.Name, Rating," +
					" Price,Origin, Material, Style, Sample, Orders, Color.Name as Color, Color.Id as ColorId ,Size.Id as Size, PhotoUrl  " +
					"from Cart join Product on Cart.ProductId = Product.Id join Color " +
					"on Color.Id = Cart.ColorId join Size on Size.Id = Cart.SizeId " +
					"where UserId = @UserId";
				var cart = await connection.QueryAsync(queryStr, new
				{
					UserId = id
				});
				if (cart == null) return BadRequest("Cart empty.");
				return Ok(cart);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}


		[HttpPost("cart/{id:Guid}")]
		public async Task<IActionResult> AddIntoCart([FromRoute] Guid id, [FromForm] Cart cart)
		{
			await using SqlConnection connection = _connectionFactory.CreateConnection();
			if (!id.Equals(cart.UserId))
			{
				return BadRequest("Unauthorization.");
			}
			try
			{
				string sqlStr = "Insert into Cart(ProductId, UserId, ColorId, SizeId, Quantity) values (@ProductId, @UserId, @ColorId, @SizeId, @Quantity)";
				await connection.ExecuteAsync(sqlStr, cart);
				return Ok("Add product into cart successfully");
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpDelete("cart/{id:Guid}")]
		public async Task<IActionResult> DeleteProductFromCart([FromRoute] Guid id, [FromForm] CartDeleteDTO cart)
		{
			await using SqlConnection connection = _connectionFactory.CreateConnection();
			if (!id.Equals(cart.UserId))
			{
				return BadRequest("Unauthorization.");
			}
			try
			{
				string sqlStr = "Delete Cart where ProductId = @ProductId and UserId = @UserId and ColorId = @ColorId and SizeId = @SizeId";
				await connection.ExecuteAsync(sqlStr, cart);
				return Ok();
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
	}
}
