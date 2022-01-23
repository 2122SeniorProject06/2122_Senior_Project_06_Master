using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;
using _2122_Senior_Project_06.Models;

namespace _2122_Senior_Project_06.DataContext
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {

        }

       public DbSet<JournalEntry> Journals { get; set; } = null!;

    }
}