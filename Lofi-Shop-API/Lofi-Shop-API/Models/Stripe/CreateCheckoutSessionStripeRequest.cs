namespace Lofi_Shop_API.Models.Stripe
{
	public record CreateCheckoutSessionStripeRequest
	{
		public int Quantity { get; set; }
		public string PriceId { get; set; }
	}
}
