
using CarStorageApi.Models;
using Microsoft.EntityFrameworkCore;
using CarStorageApi.Data;

namespace CarStorageApi.Repositories
{

    /// <summary>
    /// 
    /// </summary>
    /// <seealso cref="CarStorageApi.Repositories.ICarRepository" />
    public class CarRepository: ICarRepository
    {
        /// <summary>
        /// The context
        /// </summary>
        private readonly CarContext _context;

        /// <summary>
        /// Initializes a new instance of the <see cref="CarRepository" /> class.
        /// </summary>
        /// <param name="context">The context.</param>
        public CarRepository(CarContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Gets the cars.
        /// </summary>
        /// <returns></returns>
        public List<Car> GetCars()
        {
            return _context.Cars.Include(x => x.Part).ToList();
        }

    }
}