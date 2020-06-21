using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using mini_Carsales.DAL;
using mini_Carsales.IDAL;
using mini_Carsales.Models;
using mini_Carsales.ServiceModel;

namespace mini_Carsales.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehicleController : ControllerBase
    {

        private readonly IBaseRepository<Vehicle> _VehicleRepository;
        private readonly IBaseRepository<VehicleProperty> _VehiclePropertyRepository;
        private readonly IBaseRepository<VehiclePropertyData> _VehiclePropertyDataRepository;
        private readonly IBaseRepository<VehicleType> _VehicleTypeRepository;


        public VehicleController(IBaseRepository<Vehicle> VehicleRepository
            , IBaseRepository<VehicleProperty> VehiclePropertyRepository
            , IBaseRepository<VehiclePropertyData> VehiclePropertyDataRepository
            , IBaseRepository<VehicleType> VehicleTypeRepository)
        {
            _VehicleRepository = VehicleRepository;
            _VehiclePropertyRepository = VehiclePropertyRepository;
            _VehiclePropertyDataRepository = VehiclePropertyDataRepository;
            _VehicleTypeRepository = VehicleTypeRepository;

        }
        [HttpGet("[action]")]
        public IActionResult GetVehicles()
        {
           List<VehicleService> queryList = (from l in _VehicleRepository.FindAll()
                             join c in _VehicleTypeRepository.FindAll()
                             on l.VehicleTypeId equals c.Id
                             select new VehicleService { VehicleId = l.Id, Make = l.Make, Model = l.Model, TypeName = c.TypeName}).ToList();
            return Ok(queryList);
        }
        [HttpGet("[action]")]
        public IActionResult GetVehicleType()
        {
            return Ok(_VehicleTypeRepository.FindAll());
        }

        [HttpGet(("[action]/{id}"))]
        public IActionResult GetVehicleTypeid([FromRoute] int id)
        {
            return Ok(_VehicleTypeRepository.Find(a => a.Id == id).SingleOrDefault());
        }
        [HttpGet(("[action]/{id}"))]
        public IActionResult GetVehicleProperty([FromRoute] int id)
        {
            return Ok(_VehiclePropertyRepository.Find(a=>a.VehicleTypeId==id));
        }
        [HttpGet(("[action]/{id}"))]
        public IActionResult GetVehicleDetail([FromRoute] int id)
        {

            int VehicleTypeId = _VehicleRepository.Find(a => a.Id == id).FirstOrDefault().VehicleTypeId;

            List<PropertyDataService> PropertyDatas = (from l in _VehiclePropertyRepository.Find(a => a.VehicleTypeId == VehicleTypeId)
                                                       join c in _VehiclePropertyDataRepository.Find(a => a.VehicleId == id)
                                                       on l.Id equals c.VehiclePropertyId into temp
                                                       from t in temp.DefaultIfEmpty()
                                                       select new PropertyDataService { VehicleId = id, VehiclePropertyId = l.Id, VehiclePropertyName = l.VehiclePropertyName, PropertyData = t == null ? "" : t.PropertyData, VehiclePropertyDataType=l.VehiclePropertyDataType }).ToList();

            VehicleService ReturnData = (from l in _VehicleRepository.Find(a => a.Id == id)
                                        join c in _VehicleTypeRepository.FindAll()
                                        on l.VehicleTypeId equals c.Id
                                         select new VehicleService { VehicleId = l.Id, Make = l.Make, Model = l.Model, VehicleTypeId = l.VehicleTypeId, TypeName = c.TypeName, VehicleDetail = PropertyDatas }).FirstOrDefault();

            return Ok(ReturnData);
        }

        [HttpPost("[action]")]
        public IActionResult AddVehicleType([FromBody] VehicleType value)
        {
           
            return Ok(new JsonResult(_VehicleTypeRepository.Add(value).Id));
        }
        [HttpPost("[action]")]
        public IActionResult ChangeVehicleProperties([FromBody] VehicleProperty[] value)
        {
            int VehicleTypeId = value[0].VehicleTypeId;
            foreach (var item in value)
            {

                if (item.Id==-1 && item.VehiclePropertyName!="")
                {
                    _VehiclePropertyRepository.Add(item);

                }
                else
                {

                    if (item.VehiclePropertyName != "")
                    {
                        _VehiclePropertyRepository.Update(item.Id,item);
                    }
                    else
                    {
                        if (_VehiclePropertyDataRepository.Find(a=>a.VehiclePropertyId==item.Id).Count()==0)
                        {
                            var tempItem = _VehiclePropertyRepository.Find(a => a.Id == item.Id).FirstOrDefault();
                            _VehiclePropertyRepository.Delete(tempItem);
                        }
                    }
                }

            }
            
            return Ok(_VehiclePropertyRepository.Find(a=>a.VehicleTypeId== VehicleTypeId).ToList());
        }
        [HttpPost("[action]")]
        public IActionResult AddVehicle([FromBody] VehicleService value)
        {
            Vehicle newVehicle =_VehicleRepository.Add(new Vehicle { Make = value.Make, Model = value.Model, VehicleTypeId = value.VehicleTypeId });

            foreach (var m in value.VehicleDetail)
            {
                _VehiclePropertyDataRepository.Add(new VehiclePropertyData { VehicleId = newVehicle.Id, VehiclePropertyId = m.VehiclePropertyId, PropertyData = m.PropertyData });
            }
            return Ok(new JsonResult("The Vehicle was Added Successfully"));
        }

        [HttpPut("[action]/{id}")]
        public IActionResult updateVehicle([FromRoute] int id, [FromBody] VehicleService value)
        {
            Vehicle updateVehicle = _VehicleRepository.Update(id,new Vehicle {Id= id, Make = value.Make, Model = value.Model, VehicleTypeId = value.VehicleTypeId });

            foreach (var m in value.VehicleDetail)
            {
                _VehiclePropertyDataRepository.Update(id,new VehiclePropertyData { VehicleId = id, VehiclePropertyId = m.VehiclePropertyId, PropertyData = m.PropertyData }, m.VehiclePropertyId);
            }
            return Ok(new JsonResult("The Vehicle was Updated Successfully"));
        }

        [HttpPut("[action]/{id}")]
        public IActionResult UpdateVehicleType([FromRoute] int id, [FromBody] VehicleType value)
        {

            _VehicleTypeRepository.Update(id, value);

            return Ok(new JsonResult("The Vehicle was Updated Successfully"));
        }


        [HttpDelete("[action]/{id}")]
        public IActionResult DeleteVehicle([FromRoute] int id)
        {

            List<VehiclePropertyData> DataProperty = _VehiclePropertyDataRepository.Find(x => x.VehicleId == id).ToList();

            foreach (var m in DataProperty)
            {
                _VehiclePropertyDataRepository.Delete(m);
            }
            Vehicle DataVehicle = _VehicleRepository.Find(x => x.Id == id).FirstOrDefault();

            _VehicleRepository.Delete(DataVehicle);

            return Ok(new JsonResult("The Vehicle with id " + id + " was Deleted."));

        }

    }
}
