using Lofi_Shop_API.Models.Stripe;
using Microsoft.AspNetCore.Mvc;

namespace Lofi_Shop_API.Services
{
	public interface IStripeAppService
	{
		Task<StripeCustomer> AddStripeCustomerAsync(AddStripeCustomer customer, CancellationToken ct);
		Task<StripePayment> AddStripePaymentAsync(AddStripePayment payment, CancellationToken ct);
		string CreateCheckoutSession([FromBody] List<CreateCheckoutSessionStripeRequest> request);
	}
}
