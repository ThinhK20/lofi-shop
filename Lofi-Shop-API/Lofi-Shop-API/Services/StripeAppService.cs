using Lofi_Shop_API.Models.Stripe;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;

namespace Lofi_Shop_API.Services
{
	public class StripeAppService : IStripeAppService
	{
		private readonly ChargeService _chargeService;
		private readonly CustomerService _customerService;
		private readonly TokenService _tokenService;


		public StripeAppService(ChargeService chargeService, CustomerService customerService, TokenService tokenService)
		{
			_chargeService = chargeService;
			_customerService = customerService;
			_tokenService = tokenService;
		}


		public async Task<StripeCustomer> AddStripeCustomerAsync(AddStripeCustomer customer, CancellationToken ct)
		{
			TokenCreateOptions tokenOptions = new TokenCreateOptions
			{
				Card = new TokenCardOptions
				{
					Name = customer.Name,
					Number = customer.CreditCard.CardNumber,
					ExpYear = customer.CreditCard.ExpirationYear,
					ExpMonth = customer.CreditCard.ExpirationMonth,
					Cvc = customer.CreditCard.Cvc
				}
			};
			Token stripeToken = await _tokenService.CreateAsync(tokenOptions, null, ct);

			CustomerCreateOptions customerOptions = new CustomerCreateOptions
			{
				Name = customer.Name,
				Email = customer.Email,
				Source = stripeToken.Id
			};

			Customer createdCustomer = await _customerService.CreateAsync(customerOptions, null, ct);

			return new StripeCustomer(createdCustomer.Name, createdCustomer.Email, createdCustomer.Id);

		}

		public async Task<StripePayment> AddStripePaymentAsync(AddStripePayment payment, CancellationToken ct)
		{

			ChargeCreateOptions paymentOptions = new ChargeCreateOptions
			{
				Customer = payment.CustomerID,
				ReceiptEmail = payment.ReceiptEmail,
				Description = payment.Description,
				Currency = payment.Currency,
				Amount = payment.Amount
			};

			var createdPayment = await _chargeService.CreateAsync(paymentOptions, null, ct);

			return new StripePayment(
			  createdPayment.CustomerId,
			  createdPayment.ReceiptEmail,
			  createdPayment.Description,
			  createdPayment.Currency,
			  createdPayment.Amount,
			  createdPayment.Id);
		}


		public async Task<string> CreateCheckoutSession([FromBody] List<CreateCheckoutSessionStripeRequest> request)
		{
			var domain = "http://localhost:3000";

			var lineItems = new List<SessionLineItemOptions>();

			foreach (var item in request)
			{
				var lineItem = new SessionLineItemOptions
				{
					Quantity = item.Quantity,
					Price = item.PriceId
				};
				lineItems.Add(lineItem);
			}


			var options = new SessionCreateOptions
			{
				LineItems = lineItems,
				Mode = "payment",
				SuccessUrl = domain + "/order",
				CancelUrl = domain + "/cart",
			};
			var service = new SessionService();
			Session session = service.Create(options);
			return session.Url;
		}
	}
}
