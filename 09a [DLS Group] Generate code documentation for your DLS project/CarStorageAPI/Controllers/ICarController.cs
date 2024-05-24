using CarStorageApi.Models;

namespace CarStorageApi.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    public interface ICarController
    {
        /// <summary>
        /// Gets the cars.
        /// </summary>
        /// <returns></returns>
        public List<Car> GetCars();
    }
}