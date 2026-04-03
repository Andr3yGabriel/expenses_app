using expenses_api.Models;
using Microsoft.EntityFrameworkCore;
namespace expenses_api.Infrastructure;

public class ConnectionContext(DbContextOptions<ConnectionContext> options) : DbContext(options)
{
    public DbSet<Person> Persons => Set<Person>();
    public DbSet<Transaction> Transactions => Set<Transaction>();
    public DbSet<Category> Categories => Set<Category>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Person>(entity =>
        {
            entity.HasKey(p => p.PersonId);
            entity.Property(p => p.Name).HasMaxLength(200).IsRequired();
            entity.Property(p => p.Age).IsRequired();

            entity.HasMany(p => p.Transactions)
                .WithOne(t => t.Person)
                .HasForeignKey(t => t.PersonId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(c => c.CategoryId);
            entity.Property(c => c.Description).HasMaxLength(400).IsRequired();
            
            entity.Property(c => c.Finalidade).IsRequired();
            
            entity.HasMany(c  => c.Transactions)
                .WithOne(t => t.Category)
                .HasForeignKey(t => t.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(t => t.TransactionId);
            entity.Property(t => t.Description).HasMaxLength(400).IsRequired();
            
            entity.Property(t => t.Amount).HasPrecision(18,2).IsRequired();
            
            entity.Property(t => t.TransactionType).IsRequired();
        });
    }
}