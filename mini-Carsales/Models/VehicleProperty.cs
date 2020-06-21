namespace mini_Carsales.Models
{
    public class VehicleProperty
    {
        public int Id { get; set; }
        public int VehicleTypeId { get; set; }
        public string VehiclePropertyName { get; set; }
        public string VehiclePropertyDataType { get; set; }
        public VehicleType VehicleType { get; set; }
    }
}