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
    [Authorize]
    public class ProveedoresModelsController : ApiController
    {
        private BaroneapiContext db = new BaroneapiContext();

        // GET: api/ProveedoresModels
        public IQueryable<ProveedoresModel> GetProveedoresModels()
        {
            return db.ProveedoresModels;
        }

        // GET: api/ProveedoresModels/5
        [ResponseType(typeof(ProveedoresModel))]
        public IHttpActionResult GetProveedoresModel(int id)
        {
            ProveedoresModel proveedoresModel = db.ProveedoresModels.Find(id);
            if (proveedoresModel == null)
            {
                return NotFound();
            }

            return Ok(proveedoresModel);
        }

        // PUT: api/ProveedoresModels/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProveedoresModel([FromBody] ProveedoresModel proveedoresModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

           

            db.Entry(proveedoresModel).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return BadRequest(ex.Message);
            }

            return StatusCode(HttpStatusCode.OK);
        }

        // POST: api/ProveedoresModels
        [ResponseType(typeof(ProveedoresModel))]
        public IHttpActionResult PostProveedoresModel(ProveedoresModel proveedoresModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ProveedoresModels.Add(proveedoresModel);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = proveedoresModel.id }, proveedoresModel);
        }

        // DELETE: api/ProveedoresModels/5
        [ResponseType(typeof(ProveedoresModel))]
        public IHttpActionResult DeleteProveedoresModel(int id)
        {
            ProveedoresModel proveedoresModel = db.ProveedoresModels.Find(id);
            if (proveedoresModel == null)
            {
                return NotFound();
            }

            db.ProveedoresModels.Remove(proveedoresModel);
            db.SaveChanges();

            return Ok(proveedoresModel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProveedoresModelExists(int id)
        {
            return db.ProveedoresModels.Count(e => e.id == id) > 0;
        }
    }
}