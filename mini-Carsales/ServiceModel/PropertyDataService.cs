using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mini_Carsales.ServiceModel
{
    public class PropertyDataService
    {
        public int VehicleId { get; set; }
        public int VehiclePropertyId { get; set; }
        public string VehiclePropertyName { get; set; }
        public string VehiclePropertyDataType { get; set; }
        public string PropertyData { get; set; }

    }
}
