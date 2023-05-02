using Lofi_Shop_API.Services;
using Stripe;

namespace Lofi_Shop_API
{
	public static class StripeInfrastructure
	{
		public static IServiceCollection AddStripeInfrastructure(this IServiceCollection services, IConfiguration configuration)
		{
			StripeConfiguration.ApiKey = configuration.GetValue<string>("StripeSettings:SecretKey");

			return services
				.AddScoped<CustomerService>()
				.AddScoped<ChargeService>()
				.AddScoped<TokenService>()
				.AddScoped<IStripeAppService, StripeAppService>();
		}
	}
}
