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
    public class MovimientosModelsController : ApiController
    {
        private BaroneapiContext db = new BaroneapiContext();

        // GET: api/MovimientosModels
        public IQueryable<MovimientosModel> GetMovimientosModels( int? idEstado = 0, string fechaDesde = "all", string fechaHasta = "all")
        {
            var param = ParameterExpression.Parameter(typeof(MovimientosModel), "x");

            //////PARAMETER of Estado
            var lenEstado = Expression.PropertyOrField(param, "Estado");
            var bodyEstado = Expression.Equal(lenEstado, Expression.Convert(Expression.Constant(idEstado.Value), typeof(int)));

            Expression AllBody = Expression.Equal(Expression.Constant("all"), Expression.Constant("all"));

            if (idEstado != 0)
                AllBody = Expression.AndAlso(AllBody, bodyEstado);

            ////PARAMETER of NroBarril
            if (fechaDesde != "all")
            {
                DateTime resultFechaDesde;
                DateTime.TryParse(fechaDesde, out resultFechaDesde);
                var lenfechaDesde = Expression.PropertyOrField(param, "fechaPactada");
                var bodyfechaDesde = Expression.GreaterThanOrEqual(lenfechaDesde, Expression.Constant(resultFechaDesde));
                AllBody = Expression.AndAlso(AllBody, bodyfechaDesde);

            }

            if (fechaHasta != "all")
            {
                DateTime resultFechaHasta;
                DateTime.TryParse(fechaHasta, out resultFechaHasta);
                var lenfechaHasta = Expression.PropertyOrField(param, "fechaPactada");
                var bodyfechaHasta = Expression.LessThanOrEqual(lenfechaHasta, Expression.Constant(resultFechaHasta));

                AllBody = Expression.AndAlso(AllBody, bodyfechaHasta);

            }


            Expression<Func<MovimientosModel, bool>> lambda = Expression.Lambda<Func<MovimientosModel, bool>>(AllBody, new ParameterExpression[] { param });

            var result = db.MovimientosModels.Where(lambda).Include(x => x.Cliente);
            return result;// db.MovimientosModels.Include(x=>x.Cliente);
        }
        [Route("api/FiltrarMovimientos")]
        public IQueryable<MovimientosModel> PostFiltrarMovimientosModels([FromBody] MovimientosModel model)
        {
            var param = ParameterExpression.Parameter(typeof(MovimientosModel), "x");

            //////PARAMETER of Estado
            var lenEstado = Expression.PropertyOrField(param, "Estado");
            var bodyEstado = Expression.Equal(lenEstado, Expression.Convert(Expression.Constant(model.Estado), typeof(int)));

            Expression AllBody = Expression.Equal(Expression.Constant("all"), Expression.Constant("all"));

            if (!model.Estado.Equals(0))
                AllBody = Expression.AndAlso(AllBody, bodyEstado);

            ////PARAMETER of NroBarril
            if (!model.fecha.Year.Equals(1))
            {
                var lenfechaDesde = Expression.PropertyOrField(param, "fechaPactada");
                var bodyfechaDesde = Expression.GreaterThanOrEqual(lenfechaDesde, Expression.Constant(model.fecha));
                AllBody = Expression.AndAlso(AllBody, bodyfechaDesde);

            }

            if (!model.fechaPactada.Year.Equals(1))
            {
              
                var lenfechaHasta = Expression.PropertyOrField(param, "fechaPactada");
                var bodyfechaHasta = Expression.LessThanOrEqual(lenfechaHasta, Expression.Constant(model.fechaPactada));

                AllBody = Expression.AndAlso(AllBody, bodyfechaHasta);

            }


            Expression<Func<MovimientosModel, bool>> lambda = Expression.Lambda<Func<MovimientosModel, bool>>(AllBody, new ParameterExpression[] { param });

            var result = db.MovimientosModels.Where(lambda).Include(x => x.Cliente);
            return result;// db.MovimientosModels.Include(x=>x.Cliente);
        }

        [Route("api/MovimientosModelsGroupByClient")]
        public IHttpActionResult PostFiltrarEstadoMovimientosModels([FromBody] MovimientosModel model)
        {
            //var param = ParameterExpression.Parameter(typeof(MovimientosModel), "x");

            ////////PARAMETER of Estado
            //var lenEstado = Expression.PropertyOrField(param, "Estado");
            //var bodyEstado = Expression.Equal(lenEstado, Expression.Convert(Expression.Constant(model.Estado), typeof(int)));

            //Expression AllBody = Expression.Equal(Expression.Constant("all"), Expression.Constant("all"));

            //if (!model.Estado.Equals(0))
            //    AllBody = Expression.AndAlso(AllBody, bodyEstado);

            //////PARAMETER of NroBarril
            //if (!model.fecha.Year.Equals(1))
            //{
            //    var lenfechaDesde = Expression.PropertyOrField(param, "fechaPactada");
            //    var bodyfechaDesde = Expression.GreaterThanOrEqual(lenfechaDesde, Expression.Constant(model.fecha));
            //    AllBody = Expression.AndAlso(AllBody, bodyfechaDesde);

            //}

            //if (!model.fechaPactada.Year.Equals(1))
            //{

            //    var lenfechaHasta = Expression.PropertyOrField(param, "fechaPactada");
            //    var bodyfechaHasta = Expression.LessThanOrEqual(lenfechaHasta, Expression.Constant(model.fechaPactada));

            //    AllBody = Expression.AndAlso(AllBody, bodyfechaHasta);

            //}


            //Expression<Func<MovimientosModel, bool>> lambda = Expression.Lambda<Func<MovimientosModel, bool>>(AllBody, new ParameterExpression[] { param });

            //var result = db.MovimientosModels.Where(lambda).Include(x => x.Cliente);
            //return result;// db.MovimientosModels.Include(x=>x.Cliente);

            var resultQuery = from mov in db.MovimientosModels
                              join cli in db.ClientesModels on mov.IdCliente equals cli.IdCliente
                              group mov by mov.IdCliente into movGroup
                              select new { Cliente = movGroup.FirstOrDefault().Cliente, movimientos = movGroup };

            return Ok(resultQuery);
                              
        }

        // GET: api/MovimientosModels/5
        [ResponseType(typeof(MovimientosModel))]
        public IHttpActionResult GetMovimientosModel(long id)
        {
            MovimientosModel movimientosModel = db.MovimientosModels.Include(x=>x.Cliente).Where(y=>y.idEntrega==id).FirstOrDefault();
            if (movimientosModel == null)
            {
                return NotFound();
            }

            return Ok(movimientosModel);
        }

        [AcceptVerbs("PATCH")]
         [ResponseType(typeof(void))]
        public IHttpActionResult PatchMovimientosModel(MovimientosModel movimientos)
        {
            MovimientosModel serverDocument = db.MovimientosModels.Find(movimientos.idEntrega);
            serverDocument.Estado = movimientos.Estado;

            db.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }

        // PUT: api/MovimientosModels/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMovimientosModel([FromBody] MovimientosModel movimientosModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

           

            db.Entry(movimientosModel).State = EntityState.Modified;

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

        // POST: api/MovimientosModels
        [ResponseType(typeof(MovimientosModel))]
        public IHttpActionResult PostMovimientosModel([FromBody] MovimientosModel movimientosModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.MovimientosModels.Add(movimientosModel);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { idEntrega = movimientosModel.idEntrega }, movimientosModel);
        }

        // DELETE: api/MovimientosModels/5
        [ResponseType(typeof(MovimientosModel))]
        public IHttpActionResult DeleteMovimientosModel(long id)
        {
            MovimientosModel movimientosModel = db.MovimientosModels.Find(id);
            if (movimientosModel == null)
            {
                return NotFound();
            }

            db.MovimientosModels.Remove(movimientosModel);
            db.SaveChanges();

            return Ok(movimientosModel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MovimientosModelExists(long id)
        {
            return db.MovimientosModels.Count(e => e.idEntrega == id) > 0;
        }
    }
}