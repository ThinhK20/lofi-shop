namespace Lofi_Shop_API.Models.Stripe
{
	public record AddStripeCustomer
	(
		string Email,
		string Name,
		AddStripeCard CreditCard
	);
}
