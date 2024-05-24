using Microsoft.EntityFrameworkCore;
using CarStorageApi.Models;

namespace CarStorageApi.Data
{
    public class CarContext : DbContext
    {
        public DbSet<Car> Cars { get; set; }
        public DbSet<Part> Parts { get; set; }
        public CarContext(DbContextOptions options) : base(options) { }
    }
}