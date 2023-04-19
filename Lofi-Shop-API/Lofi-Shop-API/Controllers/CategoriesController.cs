using Dapper;
using Lofi_Shop_API.Models;
using Lofi_Shop_API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Lofi_Shop_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ISqlConnectionFactory _connectionFactory;
        public CategoriesController(ISqlConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        [HttpGet]
        public async Task<ActionResult<List<Categories>>> GetAllCategories()
        {
            await using SqlConnection connection = _connectionFactory.CreateConnection();
            var categoriesList = await connection.QueryAsync<Categories>("Select * from Categories");
            if (categoriesList == null) return NotFound("Categories are empty.");
            return Ok(categoriesList.ToList());
        }



        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<Categories>> GetCategory([FromRoute] Guid id)
        {
            await using SqlConnection connection = _connectionFactory.CreateConnection();
            var category = await connection.QueryFirstOrDefaultAsync<Categories>("Select * from Categories Where Id = @Id", new { Id = id });
            if (category == null) return NotFound("Not found " + id + " categories.");
            return Ok(category);
        }




        [HttpPost]
        public async Task<IActionResult> AddCategory(string categoriesName)
        {
            await using SqlConnection connection = _connectionFactory.CreateConnection();
            try
            {
                var existCategory = await connection.QueryAsync<Categories>("Select * from Categories where Name = @Name", new
                {
                    Name = categoriesName
                });
                if (existCategory != null) return BadRequest("Category " + categoriesName + " already exists.");

                Categories newCategories = new Categories
                {
                    Name = categoriesName,
                    Id = Guid.NewGuid()
                };
                await connection.ExecuteAsync("Insert into Categories(Id, Name) Values (@Id , @Name)", newCategories);
                return Ok(newCategories);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
