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
using Barone.api.DTO;
using Barone.api.Models;
using Newtonsoft.Json;

namespace Barone.api.Controllers
{
    [Authorize]
    public class FermentadorModelsController : ApiController
    {
        private BaroneapiContext db = new BaroneapiContext();

        // GET: api/FermentadorModels
        public IQueryable<FermentadorDTO> GetFermentadorModels()
        {
            
            var result = from fer in db.FermentadorModels
                       //  join cocc in db.CoccionModels.Where(x=>!x.FechaFin.HasValue && x.FechaCoccion.HasValue).OrderByDescending(x=> x.FechaCoccion).FirstOrDefault() on fer.id equals cocc.Fermentador.id 
                         select new FermentadorDTO()
                         {
                             id = fer.id,
                             Capacidad = fer.Capacidad,
                             Identificador = fer.Identificador,
                             coccion = db.CoccionModels.Where(x=>x.FechaCoccion.HasValue && !x.FechaFin.HasValue &&  x.Fermentador.id==fer.id).OrderByDescending(x=>x.FechaCoccion).FirstOrDefault().NroLote
                         };
            return result;
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
        [Route("api/Embarrilar")]
        [ResponseType(typeof(void))]
        public IHttpActionResult Embarrilar([FromBody]FermentadorModel fermentadorModel)
        {
            var ultimaCoccion = db.CoccionModels.Where(x => x.Fermentador.id== fermentadorModel.id && !x.FechaFin.HasValue).OrderByDescending(x => x.FechaCoccion).FirstOrDefault();
            if (ultimaCoccion == null)
            {
                return BadRequest("Este Fermentador no tiene coccion disponible");
            }
            var fechaFinEmbarrilado = DateTime.Now;
            var diasEnTanque = Math.Round( fechaFinEmbarrilado.Subtract(ultimaCoccion.FechaCoccion.Value).TotalDays, MidpointRounding.AwayFromZero);
            var barriles = db.BarrilModels.Where(x => x.Coccion_id == ultimaCoccion.id);
            
            var Rendimiento = new {Latas=0,
                                   Barriles =barriles.Count(),
                                   TotalLitros =barriles.ToList().Sum(x=> long.Parse( x.CantidadLitros)),
                                   DiasEnTanque= diasEnTanque};
            ultimaCoccion.DetalleEmbarrilado = JsonConvert.SerializeObject(Rendimiento);
            ultimaCoccion.FechaFin = fechaFinEmbarrilado;
            db.SaveChanges();
            return Ok();

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