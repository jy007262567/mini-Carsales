using System.ComponentModel.DataAnnotations;

namespace mini_Carsales.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public int VehicleTypeId { get; set; }
        public VehicleType VehicleType { get; set; }

    }
}