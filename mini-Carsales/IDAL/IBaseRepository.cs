using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace mini_Carsales.IDAL
{
    public interface IBaseRepository<TEntity>
    {
        TEntity Add(TEntity entity);
        TEntity Update(int Id, TEntity entity,int? Id2=0);
        bool Delete(TEntity entity);
        IEnumerable<TEntity> Find(Func<TEntity, bool> where);
        IEnumerable<TEntity> FindAll();

    }


}