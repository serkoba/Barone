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

namespace Barone.api.Controllers
{
    public class DetallesMovimientosModelsController : ApiController
    {
        private BaroneapiContext db = new BaroneapiContext();

        // GET: api/DetallesMovimientosModels
        public IQueryable<DetallesMovimientosModel> GetDetallesMovimientosModels()
        {
            return db.DetallesMovimientosModels;
        }

        // GET: api/DetallesMovimientosModels/5
        [ResponseType(typeof(DetallesMovimientosModel))]
        public IHttpActionResult GetDetallesMovimientosModel(long id)
        {
            DetallesMovimientosModel detallesMovimientosModel = db.DetallesMovimientosModels.Find(id);
            if (detallesMovimientosModel == null)
            {
                return NotFound();
            }

            return Ok(detallesMovimientosModel);
        }

        // PUT: api/DetallesMovimientosModels/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDetallesMovimientosModel(long id, DetallesMovimientosModel detallesMovimientosModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != detallesMovimientosModel.id)
            {
                return BadRequest();
            }

            db.Entry(detallesMovimientosModel).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DetallesMovimientosModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/DetallesMovimientosModels
        [ResponseType(typeof(DetallesMovimientosModel))]
        public IHttpActionResult PostDetallesMovimientosModel(DetallesMovimientosModel detallesMovimientosModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.DetallesMovimientosModels.Add(detallesMovimientosModel);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = detallesMovimientosModel.id }, detallesMovimientosModel);
        }

        // DELETE: api/DetallesMovimientosModels/5
        [ResponseType(typeof(DetallesMovimientosModel))]
        public IHttpActionResult DeleteDetallesMovimientosModel(long id)
        {
            DetallesMovimientosModel detallesMovimientosModel = db.DetallesMovimientosModels.Find(id);
            if (detallesMovimientosModel == null)
            {
                return NotFound();
            }

            db.DetallesMovimientosModels.Remove(detallesMovimientosModel);
            db.SaveChanges();

            return Ok(detallesMovimientosModel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DetallesMovimientosModelExists(long id)
        {
            return db.DetallesMovimientosModels.Count(e => e.id == id) > 0;
        }
    }
}