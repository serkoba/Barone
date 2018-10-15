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
using System.Linq.Expressions;

namespace Barone.api.Controllers
{
    [Authorize]
    public class PagoModelsController : ApiController
    {
        private BaroneapiContext db = new BaroneapiContext();


        [Route("api/PagoModels/GetReporte")]
        [HttpGet] //Always explicitly state the accepted HTTP method
        public IHttpActionResult GetCuentasdebeHaber(string idEstado = "all", string fechaDesde = "all", string fechaHasta = "all")
        {
            ///////////////////PARAMETROS PARA MOVIMIENTOS
            var param = ParameterExpression.Parameter(typeof(MovimientosModel), "x");
            Expression AllBody = Expression.Equal(Expression.Constant("all"), Expression.Constant("all"));
            
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
            ///////////////////FIN FILTRO


            //////////////FILTRO PARA PAGOS
            var paramPagos = ParameterExpression.Parameter(typeof(PagoModel), "x");
            Expression AllBodyPagos = Expression.Equal(Expression.Constant("all"), Expression.Constant("all"));
            ///PARAMETER of FechaDesde
            if (fechaDesde != "all")
            {
                DateTime resultFechaDesdePago;
                DateTime.TryParse(fechaDesde, out resultFechaDesdePago);
                var lenfechaDesdePago = Expression.PropertyOrField(paramPagos, "FechaPago");
                var bodyfechaDesdePago = Expression.GreaterThanOrEqual(lenfechaDesdePago, Expression.Constant(resultFechaDesdePago));
                AllBodyPagos = Expression.AndAlso(AllBodyPagos, bodyfechaDesdePago);

            }

            if (fechaHasta != "all")
            {
                DateTime resultFechaHastaPago;
                DateTime.TryParse(fechaHasta, out resultFechaHastaPago);
                var lenfechaHastaPago = Expression.PropertyOrField(paramPagos, "FechaPago");
                var bodyfechaHastaPago = Expression.LessThanOrEqual(lenfechaHastaPago, Expression.Constant(resultFechaHastaPago));

                AllBodyPagos = Expression.AndAlso(AllBodyPagos, bodyfechaHastaPago);

            }


            Expression<Func<PagoModel, bool>> lambdaPago = Expression.Lambda<Func<PagoModel, bool>>(AllBodyPagos, new ParameterExpression[] { paramPagos });
            /////////////////////////////////FIN DE FILTRO.



            IEnumerable<CuentasDebeHaberDTO> result = db.PagoModels.Include(x => x.Cliente).Where(lambdaPago).
                                                     Select(item => new CuentasDebeHaberDTO()
                                                     {
                                                         Descripcion = item.Tipo==1?"Efectivo": item.Tipo==2?"Cheque": item.Tipo==3?"Devolucion":"",
                                                         DebeImporte = item.Importe,

                                                         Fecha = item.FechaPago,
                                                         IdCliente = item.IdCliente,
                                                         Cliente = item.Cliente
                                                     });



            IEnumerable<CuentasDebeHaberDTO> ResultMovimientos =  db.MovimientosModels.Include(x => x.Cliente).Where(lambda)
                                                                 .ToList().Select
                                                     (item => new CuentasDebeHaberDTO()
                                                     {
                                                         Descripcion = "Nro Remito: " + item.idEntrega + ", " + (item.Estado==1? "Pendiente" : item.Estado == 2 ? "En Progreso" : item.Estado == 3 ? "Entregado" : "Incompleto"),
                                                         HaberImporte = Convert.ToDouble(item.TotalImporte.ToString()),
                                                         Fecha = item.fechaPactada,
                                                         IdCliente = item.IdCliente,
                                                         Cliente = item.Cliente
                                                     });

            IEnumerable<CuentasDebeHaberDTO> concatAllResult = null;
            if (ResultMovimientos != null)
            {
                if (result != null)
                    concatAllResult= result.Concat(ResultMovimientos);
                else
                    concatAllResult = ResultMovimientos;
            }
            else
                concatAllResult = result;
            return Ok(concatAllResult);
        }

        // GET: api/PagoModels
        public IQueryable<PagoModel> GetPagoModels()
        {
            return db.PagoModels.Include(x=>x.Cliente);
        }

        // GET: api/PagoModels/5
        [ResponseType(typeof(PagoModel))]
        public IHttpActionResult GetPagoModel(long id)
        {
            PagoModel pagoModel = db.PagoModels.Include(x => x.Cliente).Where(x => x.idPago == id).FirstOrDefault();
            if (pagoModel == null)
            {
                return NotFound();
            }

            return Ok(pagoModel);
        }

        // PUT: api/PagoModels/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPagoModel( PagoModel pagoModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

         

            db.Entry(pagoModel).State = EntityState.Modified;

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

        // POST: api/PagoModels
        [ResponseType(typeof(PagoModel))]
        public IHttpActionResult PostPagoModel([FromBody]PagoModel pagoModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.PagoModels.Add(pagoModel);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { idPago = pagoModel.idPago }, pagoModel);
        }

        // DELETE: api/PagoModels/5
        [ResponseType(typeof(PagoModel))]
        public IHttpActionResult DeletePagoModel(long id)
        {
            PagoModel pagoModel = db.PagoModels.Find(id);
            if (pagoModel == null)
            {
                return NotFound();
            }

            db.PagoModels.Remove(pagoModel);
            db.SaveChanges();

            return Ok(pagoModel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PagoModelExists(long id)
        {
            return db.PagoModels.Count(e => e.idPago == id) > 0;
        }
    }
}