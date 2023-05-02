using AutoMapper;
using Lofi_Shop_API.Models;
using Lofi_Shop_API.Models.DTO.Product;
using Lofi_Shop_API.Models.DTO.Users;
using Lofi_Shop_API.Models.Order;

namespace Lofi_Shop_API
{
	public class MappingConfig : Profile
	{
		public MappingConfig()
		{
			CreateMap<UsersDTO, UsersResultDTO>().ReverseMap();
			CreateMap<Users, UsersResultDTO>().ReverseMap();
			CreateMap<Product, ProductDTO>().ReverseMap();

			CreateMap<ProductInfo, Product>().ReverseMap();

			CreateMap<Orders, OrdersCreatedDTO>().ReverseMap();
			CreateMap<OrdersDetails, OrdersDetailsDTO>().ReverseMap();

		}
	}
}
