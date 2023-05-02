namespace Lofi_Shop_API.Models.Stripe
{
	public record StripeCustomer
	(
		string Name,
		string Email,
		string CustomerId
	);
}
