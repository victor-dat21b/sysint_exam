using CarStorageApi.Repositories;
using CarStorageApi.Services;
using CarStorageApi.Controllers;
using CarStorageApi.Data;
using CarStorageApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Text;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

/// <summary>
/// 
/// </summary>
internal class Program
{
    /// <summary>
    /// Defines the entry point of the application.
    /// </summary>
    /// <param name="args">The arguments.</param>
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        var configuration = builder.Configuration;

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddTransient<ICarController, CarController>();
        builder.Services.AddTransient<ICarService, CarService>();
        builder.Services.AddTransient<ICarRepository, CarRepository>();
        builder.Services.AddTransient<RabbitMQService>();
        builder.Services.AddDbContext<CarContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
        builder.Services.AddSwaggerGen();
        var app = builder.Build();
        using (var scope = app.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<CarContext>();
            db.Database.Migrate();
        }
        app.UseRouting();
        app.MapGet("/GetCars", (ICarController carController) =>
        {
            return carController.GetCars(); 
        });
        app.UseSwagger();
        app.UseSwaggerUI();

        // RabbitMQ
        app.MapGet("/Receive", (RabbitMQService rabbitMQSender, ICarController carController) =>
        {
            var cars = carController.GetCars();
            rabbitMQSender.Publish(cars);
            return "Received";
        });

        app.Run();
    }
}