using Back_Estoque.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Back_Estoque.Data
{
    public class AppDbContext : IdentityDbContext<UserModel, IdentityRole, string>
    {
        
            public AppDbContext(DbContextOptions<AppDbContext> options)
                : base(options)
            {
            }
           
            protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<UserModel>().Property(e => e.Id).ValueGeneratedOnAdd();

            }

            public virtual DbSet<ProductsModel> Products { get; set; }
    }
}
