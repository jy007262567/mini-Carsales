using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mini_Carsales.ServiceModel
{
    public class VehicleService
    {
        public int VehicleId { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public int VehicleTypeId { get; set; }
        public string TypeName { get; set; }
        public ICollection<PropertyDataService> VehicleDetail { get; set; }
    }
}
