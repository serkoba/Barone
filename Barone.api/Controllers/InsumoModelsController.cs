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
    public class InsumoModelsController : ApiController
    {
        private BaroneapiContext db = new BaroneapiContext();

        // GET: api/InsumoModels
        public IQueryable<InsumoModel> GetInsumoModels()
        {
            return db.InsumoModels;
        }

        // GET: api/InsumoModels/5
        [ResponseType(typeof(InsumoModel))]
        public IHttpActionResult GetInsumoModel(int id)
        {
            InsumoModel insumoModel = db.InsumoModels.Find(id);
            if (insumoModel == null)
            {
                return NotFound();
            }

            return Ok(insumoModel);
        }

        // PUT: api/InsumoModels/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutInsumoModel([FromBody] InsumoModel insumoModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            db.Entry(insumoModel).State = EntityState.Modified;

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

        // POST: api/InsumoModels
        [ResponseType(typeof(InsumoModel))]
        public IHttpActionResult PostInsumoModel(InsumoModel insumoModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.InsumoModels.Add(insumoModel);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = insumoModel.id }, insumoModel);
        }

        // DELETE: api/InsumoModels/5
        [ResponseType(typeof(InsumoModel))]
        public IHttpActionResult DeleteInsumoModel(int id)
        {
            InsumoModel insumoModel = db.InsumoModels.Find(id);
            if (insumoModel == null)
            {
                return NotFound();
            }

            db.InsumoModels.Remove(insumoModel);
            db.SaveChanges();

            return Ok(insumoModel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool InsumoModelExists(int id)
        {
            return db.InsumoModels.Count(e => e.id == id) > 0;
        }
    }
}