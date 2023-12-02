using DragAndDrop.WebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace DragAndDrop.WebApi.AppDbContext;

public class TodoDbContext : DbContext
{
   public DbSet<Todo> Todos { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {


        optionsBuilder.UseSqlServer("Data Source=DESKTOP-3O4V1S5;Initial Catalog=TodoDB;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False");

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {


   

}






}
