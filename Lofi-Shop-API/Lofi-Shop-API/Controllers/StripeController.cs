using Lofi_Shop_API.Models.Stripe;
using Lofi_Shop_API.Services;
using Microsoft.AspNetCore.Mvc;

namespace Lofi_Shop_API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class StripeController : ControllerBase
	{
		private readonly IStripeAppService _stripeService;

		public StripeController(IStripeAppService stripeService)
		{
			_stripeService = stripeService;
		}

		[HttpPost("customer/add")]
		public async Task<ActionResult<StripeCustomer>> AddStripeCustomer([FromForm] AddStripeCustomer customer, CancellationToken ct)
		{
			try
			{
				StripeCustomer createdCustomer = await _stripeService.AddStripeCustomerAsync(customer, ct);
				return Ok(createdCustomer);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPost("payment/add")]
		public async Task<ActionResult<StripePayment>> AddStripePayment([FromBody] AddStripePayment payment, CancellationToken ct)
		{
			try
			{
				StripePayment createdPayment = await _stripeService.AddStripePaymentAsync(payment, ct);
				return Ok(createdPayment);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPost("create-checkout-session")]
		public async Task<IActionResult> CreateCheckoutSession([FromBody] List<CreateCheckoutSessionStripeRequest> request)
		{
			string Url = _stripeService.CreateCheckoutSession(request);
			return Ok(Url);
		}


	}
}
