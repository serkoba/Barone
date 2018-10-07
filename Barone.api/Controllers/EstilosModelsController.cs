using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Barone.api.Models;
using System.Linq.Expressions;

namespace Barone.api.Controllers
{
    [Authorize]
    public class EstilosModelsController : ApiController
    {
        private BaroneapiContext db = new BaroneapiContext();

        // GET: api/EstilosModels
        public IQueryable<EstilosModel> GetEstilosModels(string Nombre = "all")
        {
            var param = ParameterExpression.Parameter(typeof(EstilosModel), "x");

            ////PARAMETER of NroBarril
            var lenNombre = Expression.PropertyOrField(param, "Nombre");
            var bodyNombre = Expression.Equal(lenNombre, Expression.Constant(Nombre));

           


            Expression AllBody = Expression.Equal(Expression.Constant(Nombre), Expression.Constant(Nombre));
            if (Nombre != "all")
                AllBody = Expression.AndAlso(AllBody, bodyNombre);


            Expression<Func<EstilosModel, bool>> lambda = Expression.Lambda<Func<EstilosModel, bool>>(AllBody, new ParameterExpression[] { param });

            return db.EstilosModels.Where(lambda).Include(x=>x.rangoPrecio);
            //  return db.EstilosModels;
        }
  

        // GET: api/EstilosModels/5
        [ResponseType(typeof(EstilosModel))]
        public IHttpActionResult GetEstilosModel(int id)
        {
            EstilosModel estilosModel = db.EstilosModels.Include(x=>x.rangoPrecio).Where(x=> x.IdEstilo==id).FirstOrDefault();
            if (estilosModel == null)
            {
                return NotFound();
            }

            return Ok(estilosModel);
        }

        // PUT: api/EstilosModels/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEstilosModel(EstilosModel estilosModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //if (id != estilosModel.IdEstilo)
            //{
            //    return BadRequest();
            //}

            db.Entry(estilosModel).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return BadRequest(ex.Message);
                //if (!EstilosModelExists(id))
                //{
                //    return NotFound();
                //}
                //else
                //{
                //    throw;
                //}
            }

            return StatusCode(HttpStatusCode.OK);
        }

        // POST: api/EstilosModels
        [ResponseType(typeof(EstilosModel))]
        public IHttpActionResult PostEstilosModel(EstilosModel estilosModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.EstilosModels.Add(estilosModel);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = estilosModel.IdEstilo }, estilosModel);
        }

        // DELETE: api/EstilosModels/5
        [ResponseType(typeof(EstilosModel))]
        public IHttpActionResult DeleteEstilosModel(int id)
        {
            EstilosModel estilosModel = db.EstilosModels.Find(id);
            if (estilosModel == null)
            {
                return NotFound();
            }

            db.EstilosModels.Remove(estilosModel);
            db.SaveChanges();

            return Ok(estilosModel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EstilosModelExists(int id)
        {
            return db.EstilosModels.Count(e => e.IdEstilo == id) > 0;
        }
    }
}