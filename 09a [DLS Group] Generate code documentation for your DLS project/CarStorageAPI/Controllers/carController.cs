using Microsoft.AspNetCore.Mvc;
using CarStorageApi.Services;
using CarStorageApi.Models;

namespace CarStorageApi.Controllers
{

    /// <summary>
    /// 
    /// </summary>
    /// <seealso cref="CarStorageApi.Controllers.ICarController" />
    public class CarController: ICarController
    {
        /// <summary>
        /// The car service
        /// </summary>
        private ICarService _carService;
        /// <summary>
        /// Initializes a new instance of the <see cref="CarController"/> class.
        /// </summary>
        /// <param name="carService">The car service.</param>
        public CarController(ICarService carService) 
        {
            _carService = carService;
        }

        /// <summary>
        /// Gets the cars.
        /// </summary>
        /// <returns></returns>
        public List<Car> GetCars()
        {
            return _carService.GetCars();
        }
    }
}
