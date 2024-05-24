using RabbitMQ.Client.Events;
using RabbitMQ.Client;
using System.Text;
using CarStorageApi.Controllers;
using CarStorageApi.Models;

namespace CarStorageApi.Services
{
    /// <summary>
    /// 
    /// </summary>
    public class RabbitMQService
    {
        /// <summary>
        /// The connection
        /// </summary>
        private readonly IConnection _connection;
        /// <summary>
        /// The channel
        /// </summary>
        private readonly IModel _channel;
        /// <summary>
        /// The factory
        /// </summary>
        private readonly ConnectionFactory _factory;
        /// <summary>
        /// The rabbit mq configuration
        /// </summary>
        private readonly IConfigurationSection _rabbitMQConfig;

        /// <summary>
        /// Initializes a new instance of the <see cref="RabbitMQService"/> class.
        /// </summary>
        /// <param name="configuration">The configuration.</param>
        public RabbitMQService(IConfiguration configuration)
        {
            _rabbitMQConfig = configuration.GetSection("RabbitMQ");
            _factory = new ConnectionFactory()
            {
                HostName = _rabbitMQConfig["HostName"],
                UserName = _rabbitMQConfig["UserName"],
                Password = _rabbitMQConfig["Password"]
            };
        }

        /// <summary>
        /// Publishes the specified cars.
        /// </summary>
        /// <param name="cars">The cars.</param>
        public void Publish(List<Car> cars)
        {
            using (var connection = _factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.ExchangeDeclare(_rabbitMQConfig["ExchangeName"], ExchangeType.Fanout);

                foreach (var car in cars)
                {
                    var body = Encoding.UTF8.GetBytes(car.ToString());
                    channel.BasicPublish(exchange: _rabbitMQConfig["ExchangeName"],
                                         routingKey: _rabbitMQConfig["RoutingKey"],
                                         basicProperties: null,
                                         body: body);
                    Console.WriteLine($"Sent: {car}");
                }
            }
        }
    }
}
