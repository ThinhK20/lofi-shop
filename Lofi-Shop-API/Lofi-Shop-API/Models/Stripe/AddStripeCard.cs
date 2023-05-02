namespace Lofi_Shop_API.Models.Stripe
{
	public record AddStripeCard
	(
		string Name,
		string CardNumber,
		string ExpirationYear,
		string ExpirationMonth,
		string Cvc
	);
}
