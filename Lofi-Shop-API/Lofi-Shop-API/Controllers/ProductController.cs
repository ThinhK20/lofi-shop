using AutoMapper;
using Dapper;
using Lofi_Shop_API.Models;
using Lofi_Shop_API.Models.DTO.Product;
using Lofi_Shop_API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Lofi_Shop_API.Controllers
{
    [Route("api/product")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ISqlConnectionFactory _connectionFactory;
        private readonly IPhotoService _photoService;
        private readonly IMapper _mapper;
        public ProductController(ISqlConnectionFactory connectionFactory, IPhotoService photoService, IMapper mapper)
        {
            _connectionFactory = connectionFactory;
            _photoService = photoService;
            _mapper = mapper;
        }
        [HttpGet()]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<Product>>> GetAllProducts()
        {
            try
            {

                await using SqlConnection connection = _connectionFactory.CreateConnection();

                var result = await connection.QueryAsync<Product>("Select * from Product");

                if (result == null)
                {
                    return BadRequest(result);
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<Product>> GetProduct([FromRoute] Guid id)
        {
            try
            {
                await using SqlConnection connection = _connectionFactory.CreateConnection();
                var result = await connection.QueryFirstOrDefaultAsync<Product>("Select * from Product where Id = @Id", new
                {
                    Id = id
                });
                if (result == null) return BadRequest(result);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost()]
        public async Task<IActionResult> AddProduct([FromForm] ProductDTO productDTO)
        {
            if (productDTO == null)
            {
                return BadRequest("");
            }
            try
            {
                Guid newGuidId = Guid.NewGuid();

                ProductPhotoUploadedDTO productPhotoUploadedDTO = new ProductPhotoUploadedDTO()
                {
                    Description = "",
                    File = productDTO.File,
                    ProductId = newGuidId
                };

                var productPhoto = _photoService.UploadPhoto(productPhotoUploadedDTO);
                if (productPhoto == null) return BadRequest();


                await using SqlConnection connection = _connectionFactory.CreateConnection();
                await connection.ExecuteAsync("INSERT INTO Product (Id, Name, Description, Rating, Origin, Material, Style, Sample, Price, SubCategory, PhotoUrl)" +
                    " VALUES (@Id, @Name, @Description, @Rating, @Origin, @Material, @Style, @Sample, @Price, @SubCategory, @PhotoUrl) ", new
                    {
                        Id = newGuidId,
                        Name = productDTO.Name,
                        Description = productDTO.Description,
                        Rating = 0,
                        Origin = productDTO.Origin,
                        Material = productDTO.Material,
                        Style = productDTO.Style,
                        Sample = productDTO.Sample,
                        Price = productDTO.Price,
                        SubCategory = productDTO.SubCategory,
                        PhotoUrl = productPhoto.Url,
                    });


                await connection.ExecuteAsync("Insert into ProductPhoto(DateAdded, Description, PublicId, Url, ProductId) " +
                    "values(@DateAdded, @Description, @PublicId, @Url, @ProductId)", productPhoto);

                return Ok("Added product successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }



        [HttpGet("photo")]
        public async Task<ActionResult<List<ProductPhoto>>> GetAllProductPhotos()
        {
            try
            {
                await using SqlConnection connection = _connectionFactory.CreateConnection();
                var productPhotos = await connection.QueryAsync<ProductPhoto>("Select * from ProductPhoto");
                return Ok(productPhotos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("photo/{id:Guid}")]
        public async Task<ActionResult<ProductPhoto>> GetProductPhotosById([FromRoute] Guid id)
        {
            try
            {
                await using SqlConnection connection = _connectionFactory.CreateConnection();
                var productPhotos = await connection.QueryAsync<ProductPhoto>("Select * from ProductPhoto where ProductId = @ProductId", new
                {
                    ProductId = id
                });
                if (productPhotos == null) return BadRequest("Empty.");
                return Ok(productPhotos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("photo")]
        public async Task<IActionResult> AddProductPhoto([FromForm] ProductPhotoUploadedDTO photo)
        {
            try
            {
                await using SqlConnection connection = _connectionFactory.CreateConnection();
                var productPhoto = _photoService.UploadPhoto(photo);
                if (productPhoto == null) return BadRequest(productPhoto);

                string strSql = "Insert into ProductPhoto(DateAdded, Description, PublicId, Url, ProductId) " +
                    "values(@DateAdded, @Description, @PublicId, @Url, @ProductId)";
                await connection.ExecuteAsync(strSql, productPhoto);
                return Ok(productPhoto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("size")]
        public async Task<ActionResult<ProductSize>> GetProductSizes()
        {
            try
            {
                await using SqlConnection connection = _connectionFactory.CreateConnection();
                var productSizes = await connection.QueryAsync<ProductSize>("Select * from ProductSize");
                if (productSizes == null) return BadRequest("Empty.");
                return Ok(productSizes);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("size/{id:Guid}")]
        public async Task<ActionResult<ProductSize>> GetProductSizesById([FromRoute] Guid id)
        {
            try
            {
                await using SqlConnection connection = _connectionFactory.CreateConnection();
                var productSizes = await connection.QueryAsync<ProductSize>("Select * from ProductSize where ProductId = @ProductId", new
                {
                    ProductId = id
                });
                if (productSizes == null) return BadRequest("Empty.");
                return Ok(productSizes);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("size")]
        public async Task<IActionResult> AddProductSizeById([FromForm] ProductSize productSize)
        {
            try
            {
                productSize.SizeId = productSize.SizeId.ToUpper();
                await using SqlConnection connection = _connectionFactory.CreateConnection();
                string sqlStr = "Insert into ProductSize(SizeId, ProductId) Values (@SizeId, @ProductId)";
                await connection.ExecuteAsync(sqlStr, productSize);
                return Ok(productSize);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("size")]
        public async Task<IActionResult> DelectProductSizeById([FromForm] ProductSize productSize)
        {
            try
            {
                await using SqlConnection connection = _connectionFactory.CreateConnection();
                string sqlStr = "Delete from ProductSize Where ProductId = @ProductId and SizeId = @SizeId";
                await connection.ExecuteAsync(sqlStr, productSize);
                return Ok(productSize);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpGet("color")]
        public async Task<ActionResult<List<ProductColor>>> GetAllProductColors()
        {
            await using SqlConnection connection = _connectionFactory.CreateConnection();
            try
            {
                var colors = await connection.QueryAsync<ProductColor>("Select * from ProductColor");
                return Ok(colors.ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("color/{productId:Guid}")]
        public async Task<ActionResult<List<ProductColorResultDTO>>> GetProductColor([FromRoute] Guid productId)
        {
            await using SqlConnection connection = _connectionFactory.CreateConnection();
            try
            {
                string sqlStr = "select ProductColor.ColorId, Color.Name, Color.Description, ProductColor.ProductId from Color join ProductColor on Color.Id = ProductColor.ColorId where ProductColor.ProductId = @ProductId";
                var colors = await connection.QueryAsync<ProductColorResultDTO>(sqlStr, new { ProductId = productId });
                if (colors == null) return NotFound(productId + " not found.");
                return Ok(colors);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("color")]
        public async Task<IActionResult> AddProductColor([FromForm] ProductColorDTO color)
        {
            await using SqlConnection connection = _connectionFactory.CreateConnection();
            if (color == null) { return BadRequest("Input empty."); }
            try
            {
                await connection.ExecuteAsync("Insert into ProductColor(ProductId, ColorId, Description) values (@ProductId, @ColorId, @Description)", color);
                return Ok("Add product color successfully.");
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }


        [HttpDelete("color")]
        public async Task<IActionResult> DeleteProductColor([FromForm] ProductColor productColor)
        {
            await using SqlConnection connection = _connectionFactory.CreateConnection();
            try
            {
                string sqlStr = "Delete from ProductColor where ProductId = @ProductId and ColorId = @ColorId";
                await connection.ExecuteAsync(sqlStr, productColor);
                return Ok("Delete product color successfully.");
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }


        [HttpGet("allInfo/{productId:Guid}")]
        public async Task<ActionResult<ProductInfo>> GetProductInfo([FromRoute] Guid productId)
        {
            try
            {
                await using SqlConnection connection = _connectionFactory.CreateConnection();
                var product = await connection.QueryFirstOrDefaultAsync<Product>("Select * from Product where Id = @Id", new
                {
                    Id = productId
                });

                var colors = await connection.QueryAsync<ProductColorResultDTO>("select ProductColor.ColorId, Color.Name" +
                    ", Color.Description, ProductColor.ProductId from Color join ProductColor " +
                    "on Color.Id = ProductColor.ColorId " +
                    "where ProductColor.ProductId = @ProductId", new { ProductId = productId });

                var sizes = await connection.QueryAsync<ProductSize>("Select * from ProductSize where ProductId = @ProductId", new
                {
                    ProductId = productId
                });

                var photos = await connection.QueryAsync<ProductPhoto>("Select * from ProductPhoto where ProductId = @ProductId", new
                {
                    ProductId = productId
                });

                if (product == null || colors == null || sizes == null || photos == null) return BadRequest();


                ProductInfo productInfo = _mapper.Map<ProductInfo>(product);
                productInfo.Colors = colors.ToList();
                productInfo.Sizes = sizes.ToList();
                productInfo.Photos = photos.ToList();
                return Ok(productInfo);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
