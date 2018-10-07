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
    public class rangosPreciosModelsController : ApiController
    {
        private BaroneapiContext db = new BaroneapiContext();

        // GET: api/rangosPreciosModels
        public IQueryable<rangosPreciosModel> GetrangosPreciosModels(string fechaDesde = "all", string fechaHasta = "all")
        {
            var param = ParameterExpression.Parameter(typeof(rangosPreciosModel), "x");
            Expression AllBody = Expression.Equal(Expression.Constant("x"), Expression.Constant("x"));

            ////PARAMETER of NroBarril
            if (fechaDesde != "all")
            {
                DateTime resultFechaDesde;
                DateTime.TryParse(fechaDesde,out resultFechaDesde);
                var lenfechaDesde = Expression.PropertyOrField(param, "fechaDesde");
                var bodyfechaDesde = Expression.LessThanOrEqual(lenfechaDesde, Expression.Constant(resultFechaDesde));
                AllBody = Expression.AndAlso(AllBody, bodyfechaDesde);
 
            }

            if (fechaHasta != "all")
            {
                DateTime resultFechaHasta;
                DateTime.TryParse(fechaHasta, out resultFechaHasta);
                var lenfechaHasta = Expression.PropertyOrField(param, "fechaHasta");
                var bodyfechaHasta = Expression.GreaterThanOrEqual(lenfechaHasta, Expression.Constant(resultFechaHasta));

                AllBody = Expression.AndAlso(AllBody, bodyfechaHasta);

            }

                Expression<Func<rangosPreciosModel, bool>> lambda = Expression.Lambda<Func<rangosPreciosModel, bool>>(AllBody, new ParameterExpression[] { param });

            return db.rangosPreciosModels.Where(lambda);
        }

        // GET: api/rangosPreciosModels/5
        [ResponseType(typeof(rangosPreciosModel))]
        public IHttpActionResult GetrangosPreciosModel(long id)
        {
            rangosPreciosModel rangosPreciosModel = db.rangosPreciosModels.Find(id);
            if (rangosPreciosModel == null)
            {
                return NotFound();
            }

            return Ok(rangosPreciosModel);
        }

        // PUT: api/rangosPreciosModels/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutrangosPreciosModel(rangosPreciosModel rangosPreciosModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //if (id != rangosPreciosModel.idRango)
            //{
            //    return BadRequest();
            //}

            db.Entry(rangosPreciosModel).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return BadRequest(ex.Message);
                //if (!rangosPreciosModelExists(id))
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

        // POST: api/rangosPreciosModels
        [ResponseType(typeof(rangosPreciosModel))]
        public IHttpActionResult PostrangosPreciosModel(rangosPreciosModel rangosPreciosModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.rangosPreciosModels.Add(rangosPreciosModel);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = rangosPreciosModel.idRango }, rangosPreciosModel);
        }

        // DELETE: api/rangosPreciosModels/5
        [ResponseType(typeof(rangosPreciosModel))]
        public IHttpActionResult DeleterangosPreciosModel(long id)
        {
            rangosPreciosModel rangosPreciosModel = db.rangosPreciosModels.Find(id);
            if (rangosPreciosModel == null)
            {
                return NotFound();
            }

            db.rangosPreciosModels.Remove(rangosPreciosModel);
            db.SaveChanges();

            return Ok(rangosPreciosModel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool rangosPreciosModelExists(long id)
        {
            return db.rangosPreciosModels.Count(e => e.idRango == id) > 0;
        }
    }
}