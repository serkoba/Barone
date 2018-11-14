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
    public class RecetaModelsController : ApiController
    {
        private BaroneapiContext db = new BaroneapiContext();

        // GET: api/RecetaModels
        public IQueryable<RecetaModel> GetRecetaModels()
        {
            return db.RecetaModels;
        }

        // GET: api/RecetaModels/5
        [ResponseType(typeof(RecetaModel))]
        public IHttpActionResult GetRecetaModel(int id)
        {
            RecetaModel recetaModel = db.RecetaModels.Find(id);
            if (recetaModel == null)
            {
                return NotFound();
            }

            return Ok(recetaModel);
        }

        // PUT: api/RecetaModels/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRecetaModel([FromBody] RecetaModel recetaModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

           

            db.Entry(recetaModel).State = EntityState.Modified;

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

        // POST: api/RecetaModels
        [ResponseType(typeof(RecetaModel))]
        public IHttpActionResult PostRecetaModel(RecetaModel recetaModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.RecetaModels.Add(recetaModel);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = recetaModel.id }, recetaModel);
        }

        // DELETE: api/RecetaModels/5
        [ResponseType(typeof(RecetaModel))]
        public IHttpActionResult DeleteRecetaModel(int id)
        {
            RecetaModel recetaModel = db.RecetaModels.Find(id);
            if (recetaModel == null)
            {
                return NotFound();
            }

            db.RecetaModels.Remove(recetaModel);
            db.SaveChanges();

            return Ok(recetaModel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RecetaModelExists(int id)
        {
            return db.RecetaModels.Count(e => e.id == id) > 0;
        }
    }
}