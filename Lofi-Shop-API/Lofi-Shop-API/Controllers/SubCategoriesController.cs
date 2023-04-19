using Dapper;
using Lofi_Shop_API.Models;
using Lofi_Shop_API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Lofi_Shop_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubCategoriesController : ControllerBase
    {
        private readonly ISqlConnectionFactory _connectionFactory;

        public SubCategoriesController(ISqlConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        [HttpGet]
        public async Task<ActionResult<List<SubCategories>>> GetAllSubCategories()
        {
            await using SqlConnection connection = _connectionFactory.CreateConnection();
            var subCategoriesList = await connection.QueryAsync<SubCategories>("Select * from SubCategories");
            if (subCategoriesList == null) return NotFound("SubCategories are empty.");
            return Ok(subCategoriesList.ToList());
        }


        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<SubCategories>> GetSubCategory([FromRoute] Guid id)
        {
            await using SqlConnection connection = _connectionFactory.CreateConnection();
            var subCategory = await connection.QueryFirstOrDefaultAsync<SubCategories>("Select * from SubCategories Where Id = @Id", new { Id = id });
            if (subCategory == null) return NotFound("Not found " + id + " sub-category.");
            return Ok(subCategory);
        }


        [HttpPost]
        public async Task<IActionResult> AddSubCategory([FromForm] Guid categoryId, [FromForm] string name)
        {
            await using SqlConnection connection = _connectionFactory.CreateConnection();
            try
            {
                var existSubCategory = await connection.QueryFirstOrDefaultAsync<SubCategories>("Select * from SubCategories Where Name = @Name", new
                {
                    Name = name
                });
                if (existSubCategory != null) return BadRequest("Sub-category " + name + " already exists.");
                SubCategories subCategories = new SubCategories
                {
                    CategoriesId = categoryId,
                    Name = name,
                    Id = Guid.NewGuid()
                };
                await connection.ExecuteAsync("Insert into SubCategories(Id, CategoriesId, Name) Values (@Id, @CategoriesId, @Name)", subCategories);
                return Ok(subCategories);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
