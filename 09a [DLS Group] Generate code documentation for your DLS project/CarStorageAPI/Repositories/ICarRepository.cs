using CarStorageApi.Models;

namespace CarStorageApi.Repositories
{
    /// <summary>
    /// 
    /// </summary>
    public interface ICarRepository
    {
        /// <summary>
        /// Gets the cars.
        /// </summary>
        /// <returns></returns>
        public List<Car> GetCars();
    }
}
