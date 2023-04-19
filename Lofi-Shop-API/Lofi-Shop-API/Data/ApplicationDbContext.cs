using Lofi_Shop_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Lofi_Shop_API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<Users> Users { get; set; }
        public DbSet<ProfilePhoto> ProfilePhotos { get; set; }
    }
}
