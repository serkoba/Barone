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
    public class ComprasModelsController : ApiController
    {
        private BaroneapiContext db = new BaroneapiContext();

        // GET: api/ComprasModels
        public IQueryable<ComprasModel> GetComprasModels()
        {
            return db.ComprasModels.Include(x => x.Proveedor).Include(y => y.Insumo);
        }

        // GET: api/ComprasModels/5
        [ResponseType(typeof(ComprasModel))]
        public IHttpActionResult GetComprasModel(int id)
        {
            ComprasModel comprasModel = db.ComprasModels.Include(x => x.Proveedor).Include(y => y.Insumo).FirstOrDefault(x=>x.id==id);
            if (comprasModel == null)
            {
                return NotFound();
            }

            return Ok(comprasModel);
        }

        // PUT: api/ComprasModels/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutComprasModel([FromBody] ComprasModel comprasModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

           
            db.Entry(comprasModel).State = EntityState.Modified;


            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return BadRequest(ex.Message);
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/ComprasModels
        [ResponseType(typeof(ComprasModel))]
        public IHttpActionResult PostComprasModel(ComprasModel comprasModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Entry(comprasModel.Insumo).State = EntityState.Unchanged;
            db.Entry(comprasModel.Proveedor).State = EntityState.Unchanged;
            db.ComprasModels.Add(comprasModel);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = comprasModel.id }, comprasModel);
        }

        // DELETE: api/ComprasModels/5
        [ResponseType(typeof(ComprasModel))]
        public IHttpActionResult DeleteComprasModel(int id)
        {
            ComprasModel comprasModel = db.ComprasModels.Find(id);
            if (comprasModel == null)
            {
                return NotFound();
            }

            db.ComprasModels.Remove(comprasModel);
            db.SaveChanges();

            return Ok(comprasModel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ComprasModelExists(int id)
        {
            return db.ComprasModels.Count(e => e.id == id) > 0;
        }
    }
}