namespace Lofi_Shop_API.Models
{
    public class Cart
    {
        public required Guid ProductId { get; set; }
        public required Guid UserId { get; set; }
        public required string SizeId { get; set; }
        public required Guid ColorId { get; set; }
        public required int Quantity { get; set; }
    }
}
