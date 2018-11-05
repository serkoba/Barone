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
    public class FermentadorModelsController : ApiController
    {
        private BaroneapiContext db = new BaroneapiContext();

        // GET: api/FermentadorModels
        public IQueryable<FermentadorModel> GetFermentadorModels()
        {
            return db.FermentadorModels;
        }

        // GET: api/FermentadorModels/5
        [ResponseType(typeof(FermentadorModel))]
        public IHttpActionResult GetFermentadorModel(int id)
        {
            FermentadorModel fermentadorModel = db.FermentadorModels.Find(id);
            if (fermentadorModel == null)
            {
                return NotFound();
            }

            return Ok(fermentadorModel);
        }

        // PUT: api/FermentadorModels/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutFermentadorModel([FromBody]FermentadorModel fermentadorModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

           

            db.Entry(fermentadorModel).State = EntityState.Modified;

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

        // POST: api/FermentadorModels
        [ResponseType(typeof(FermentadorModel))]
        public IHttpActionResult PostFermentadorModel([FromBody]FermentadorModel fermentadorModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.FermentadorModels.Add(fermentadorModel);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = fermentadorModel.id }, fermentadorModel);
        }

        // DELETE: api/FermentadorModels/5
        [ResponseType(typeof(FermentadorModel))]
        public IHttpActionResult DeleteFermentadorModel(int id)
        {
            FermentadorModel fermentadorModel = db.FermentadorModels.Find(id);
            if (fermentadorModel == null)
            {
                return NotFound();
            }

            db.FermentadorModels.Remove(fermentadorModel);
            db.SaveChanges();

            return Ok(fermentadorModel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FermentadorModelExists(int id)
        {
            return db.FermentadorModels.Count(e => e.id == id) > 0;
        }
    }
}