using CarStorageApi.Repositories;
using CarStorageApi.Models;

namespace CarStorageApi.Services
{
    /// <summary>
    /// 
    /// </summary>
    /// <seealso cref="CarStorageApi.Services.ICarService" />
    public class CarService: ICarService
    {
        /// <summary>
        /// The car inventory repo
        /// </summary>
        private ICarRepository _carInventoryRepo;

        /// <summary>
        /// Initializes a new instance of the <see cref="CarService"/> class.
        /// </summary>
        /// <param name="carInventoryRepo">The car inventory repo.</param>
        public CarService(ICarRepository carInventoryRepo)
        {
            _carInventoryRepo = carInventoryRepo;
        }

        /// <summary>
        /// Gets the cars.
        /// </summary>
        /// <returns></returns>
        public List<Car> GetCars()
        {
            return _carInventoryRepo.GetCars();
        }
    }
}
