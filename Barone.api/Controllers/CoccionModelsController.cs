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
using Barone.api.DTO;

namespace Barone.api.Controllers
{
    [Authorize]
    public class CoccionModelsController : ApiController
    {
        private BaroneapiContext db = new BaroneapiContext();

        // GET: api/CoccionModels
        public IQueryable<CoccionModel> GetCoccionModels()
        {
            return db.CoccionModels.Include(x => x.Fermentador).Include(x => x.Receta).Include(x=> x.Receta.Estilo);
        }
        [Route("api/getAllNroLote")]
        public IHttpActionResult GetNroLoteAllCocciones()
        {
            var daysToSubtract = DateTime.Now.AddDays(-60);
            var result = db.CoccionModels.Where(x => x.Fecha >= daysToSubtract && x.Estado == 3).Select(x => new { viewValue = x.NroLote, value = x.NroLote });
            return Ok(result);
        }

        // GET: api/CoccionModels/5
        [ResponseType(typeof(CoccionModel))]
        public IHttpActionResult GetCoccionModel(int id)
        {
            CoccionModel coccionModel = db.CoccionModels.Find(id);
            if (coccionModel == null)
            {
                return NotFound();
            }

            return Ok(coccionModel);
        }


        [Route("api/FiltrarCoccionModel")]
        public IHttpActionResult PostFiltrarCoccionModel([FromBody] ReportFilterViewModel model)
        {
          
            var EstadoBlank = (!model.Estado.HasValue || model.Estado.Value.Equals(0));
            var FechaDesdeHastaBlank = (model.FechaDesde.Year == 1 && model.FechaHasta.Year == 1);
            var resultQuery = from mov in db.CoccionModels
                              where (EstadoBlank || model.Estado.Value == mov.Estado)
                              && (FechaDesdeHastaBlank || (model.FechaDesde <= mov.Fecha && model.FechaHasta >= mov.Fecha))

                              select mov;

            return Ok(resultQuery.Include(x=>x.Fermentador).Include(x=>x.Receta));

        }

        // PUT: api/CoccionModels/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCoccionModel([FromBody] CoccionModel coccionModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

         

            db.Entry(coccionModel).State = EntityState.Modified;

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
        

        // POST: api/CoccionModels
        [ResponseType(typeof(CoccionModel))]
        public IHttpActionResult PostCoccionModel(CoccionModel coccionModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Entry(coccionModel.Fermentador).State = EntityState.Unchanged;
            db.Entry(coccionModel.Receta).State = EntityState.Unchanged;
            db.CoccionModels.Add(coccionModel);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = coccionModel.id }, coccionModel);
        }

        [AcceptVerbs("PATCH")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PatchCoccionModel(CoccionModel coccionModel)
        {
            CoccionModel serverDocument = db.CoccionModels.Where(x => x.id == coccionModel.id).FirstOrDefault();
            if (coccionModel.Estado != 0)
                serverDocument.Estado = coccionModel.Estado;


            db.SaveChanges();
            return StatusCode(HttpStatusCode.OK);
        }

        // DELETE: api/CoccionModels/5
        [ResponseType(typeof(CoccionModel))]
        public IHttpActionResult DeleteCoccionModel(int id)
        {
            CoccionModel coccionModel = db.CoccionModels.Find(id);
            if (coccionModel == null)
            {
                return NotFound();
            }

            db.CoccionModels.Remove(coccionModel);
            db.SaveChanges();

            return Ok(coccionModel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CoccionModelExists(int id)
        {
            return db.CoccionModels.Count(e => e.id == id) > 0;
        }
    }
}