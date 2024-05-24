using CarStorageApi.Models;

namespace CarStorageApi.Services
{
    /// <summary>
    /// 
    /// </summary>
    public interface ICarService
    {
        /// <summary>
        /// Gets the cars.
        /// </summary>
        /// <returns></returns>
        public List<Car> GetCars();
    }
}
