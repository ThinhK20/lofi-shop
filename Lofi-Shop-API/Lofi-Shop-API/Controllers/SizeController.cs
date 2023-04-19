using Dapper;
using Lofi_Shop_API.Models;
using Lofi_Shop_API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Lofi_Shop_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SizeController : ControllerBase
    {
        private readonly ISqlConnectionFactory _connectionFactory;

        public SizeController(ISqlConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        [HttpGet]
        public async Task<ActionResult<Size>> GetAllSizes()
        {
            await using SqlConnection connection = _connectionFactory.CreateConnection();
            var result = await connection.QueryAsync<Size>("Select * From Size");
            if (result == null)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddSize([FromForm] Size size)
        {
            if (size == null) return BadRequest();
            try
            {
                await using SqlConnection connection = _connectionFactory.CreateConnection();
                await connection.ExecuteAsync("INSERT INTO SIZE VALUES(@Id, @Description)", size);
                return Ok(size);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
