using Dapper;
using Lofi_Shop_API.Models;
using Lofi_Shop_API.Models.DTO;
using Lofi_Shop_API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Lofi_Shop_API.Controllers
{
    [Route("api/color")]
    [ApiController]
    public class ColorController : ControllerBase
    {
        private readonly ISqlConnectionFactory _connectionFactory;
        public ColorController(ISqlConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        [HttpGet("getAllColors")]
        public async Task<ActionResult<List<Color>>> GetAllColors()
        {
            await using SqlConnection connection = _connectionFactory.CreateConnection();
            try
            {
                var colors = await connection.QueryAsync<Color>("Select * from Color");
                return Ok(colors.ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("addColor")]
        public async Task<IActionResult> AddColor([FromForm] ColorDTO color)
        {
            await using SqlConnection connection = _connectionFactory.CreateConnection();
            if (color == null) { return BadRequest("Input empty."); }
            try
            {
                string sqlStr = "Insert into Color(Name, Description) values (@Name, @Description)";
                await connection.ExecuteAsync(sqlStr, color);
                return Ok("Add color successfully.");
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }



    }
}
