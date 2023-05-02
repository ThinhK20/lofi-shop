namespace Lofi_Shop_API.Models.Stripe
{
	public record AddStripePayment
	(
		string CustomerID,
		string ReceiptEmail,
		string Description,
		string Currency,
		long Amount
	);
}
