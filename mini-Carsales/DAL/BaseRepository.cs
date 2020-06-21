using System;
using System.Collections.Generic;
using System.Linq;
using mini_Carsales.IDAL;
using System.Linq.Expressions;
using System.Reflection;
using mini_Carsales.Models;

namespace mini_Carsales.DAL
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : new()
    {

        private List<TEntity> _TEntityList;

        public BaseRepository()
        {
            Type t = typeof(TEntity);
            string TypeName = t.Name;

            switch (TypeName)
            {
                case "VehicleType":
                    _TEntityList = new List<TEntity>()
                    {
                        (TEntity)Convert.ChangeType(new VehicleType() { Id = 1, TypeName = "Car" }, typeof(TEntity)),
                        (TEntity)Convert.ChangeType(new VehicleType() { Id = 2, TypeName = "Boat" }, typeof(TEntity))
                    };
                    break;
                case "Vehicle":
                    _TEntityList = new List<TEntity>()
                    {
                        (TEntity)Convert.ChangeType(new Vehicle() { Id = 1, Make = "Toyota",Model="Wagon",VehicleTypeId=1 }, typeof(TEntity)),
                        (TEntity)Convert.ChangeType(new Vehicle() { Id = 2, Make = "Whitehaven",Model="6000 Series",VehicleTypeId=2 }, typeof(TEntity))
                    };
                    break;
                case "VehicleProperty":
                    _TEntityList = new List<TEntity>()
                    {
                        (TEntity)Convert.ChangeType(new VehicleProperty() { Id = 1, VehicleTypeId = 1,VehiclePropertyName="Engine",VehiclePropertyDataType="text" }, typeof(TEntity)),
                        (TEntity)Convert.ChangeType(new VehicleProperty() { Id = 2, VehicleTypeId = 1,VehiclePropertyName="Doors",VehiclePropertyDataType="number" }, typeof(TEntity)),
                        (TEntity)Convert.ChangeType(new VehicleProperty() { Id = 3, VehicleTypeId = 1,VehiclePropertyName="wheels",VehiclePropertyDataType="number" }, typeof(TEntity)),
                        (TEntity)Convert.ChangeType(new VehicleProperty() { Id = 4, VehicleTypeId = 1,VehiclePropertyName="bodyType",VehiclePropertyDataType="text" }, typeof(TEntity)),
                        
                        (TEntity)Convert.ChangeType(new VehicleProperty() { Id = 5, VehicleTypeId = 2,VehiclePropertyName="Length Overall",VehiclePropertyDataType="number" }, typeof(TEntity)),
                        (TEntity)Convert.ChangeType(new VehicleProperty() { Id = 6, VehicleTypeId = 2,VehiclePropertyName="Fuel",VehiclePropertyDataType="text" }, typeof(TEntity)),
                        (TEntity)Convert.ChangeType(new VehicleProperty() { Id = 7, VehicleTypeId = 2,VehiclePropertyName="Generator",VehiclePropertyDataType="text" }, typeof(TEntity))
                    };
                    break;
                case "VehiclePropertyData":
                    _TEntityList = new List<TEntity>()
                    {
                        (TEntity)Convert.ChangeType(new VehiclePropertyData() { VehicleId = 1, VehiclePropertyId = 1,PropertyData="2.0L Dynamic Force direct injection petrol engine"}, typeof(TEntity)),
                        (TEntity)Convert.ChangeType(new VehiclePropertyData() { VehicleId = 1, VehiclePropertyId = 2,PropertyData="5"}, typeof(TEntity)),
                        (TEntity)Convert.ChangeType(new VehiclePropertyData() { VehicleId = 1, VehiclePropertyId = 3,PropertyData="4"}, typeof(TEntity)),
                        (TEntity)Convert.ChangeType(new VehiclePropertyData() { VehicleId = 1, VehiclePropertyId = 4,PropertyData="Hatchback"}, typeof(TEntity)),

                        (TEntity)Convert.ChangeType(new VehiclePropertyData() { VehicleId = 2, VehiclePropertyId = 5,PropertyData="5"}, typeof(TEntity)),
                        (TEntity)Convert.ChangeType(new VehiclePropertyData() { VehicleId = 2, VehiclePropertyId = 6,PropertyData="5500 L"}, typeof(TEntity)),
                        (TEntity)Convert.ChangeType(new VehiclePropertyData() { VehicleId = 2, VehiclePropertyId = 7,PropertyData="17.5kW50HZ"}, typeof(TEntity))
                    };
                    break;
                default: 
                    _TEntityList = new List<TEntity>();
                    break;
            }

        }
        public TEntity Add(TEntity entity)
        {
            if (!entity.GetType().Name.Equals("VehiclePropertyData"))
            {
                int MaxId = 0;
                foreach (var m in _TEntityList)
                {
                    int mId = Convert.ToInt32(m.GetType().GetProperty("Id").GetValue(m));
                    if (mId > MaxId)
                    {
                        MaxId = mId;
                    }
                }
                MaxId = MaxId + 1;
                entity.GetType().GetProperty("Id").SetValue(entity, MaxId);
            }
            _TEntityList.Add(entity);
            return entity;
        }
        public TEntity Update(int Id, TEntity entity, int? Id2)
        {
            if (entity.GetType().Name.Equals("VehiclePropertyData"))
            {

                TEntity OldData = _TEntityList.FirstOrDefault(d => entity.GetType().GetProperty("VehicleId").GetValue(d).Equals(Id) && entity.GetType().GetProperty("VehiclePropertyId").GetValue(d).Equals(Id2));
                _TEntityList.Remove(OldData);

            }
            else
            {
                TEntity OldData = _TEntityList.Find(d => entity.GetType().GetProperty("Id").GetValue(d).Equals(Id));
                _TEntityList.Remove(OldData);

            }

            _TEntityList.Add(entity);

            return entity;
        }

        public bool Delete(TEntity entity)
        {
            _TEntityList.Remove(entity);
            return true;
        }

        public IEnumerable<TEntity> Find(Func<TEntity, bool> where)
        {
            return  _TEntityList.Where(where);
        }

        public IEnumerable<TEntity> FindAll()
        {
            return _TEntityList;
        }


    }
}