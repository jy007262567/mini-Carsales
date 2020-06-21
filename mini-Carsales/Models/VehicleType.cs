using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace mini_Carsales.Models
{
    public class VehicleType
    {
        public int Id { get; set; }
        public string TypeName { get; set; }
        public ICollection<Vehicle> Vehicles { get; set; }
        public ICollection<VehicleProperty> VehicleProperties { get; set; }
    }
}