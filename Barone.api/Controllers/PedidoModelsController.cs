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
using Barone.api.DTO;

namespace Barone.api.Controllers
{
    public class PedidoModelsController : ApiController
    {
        private BaroneapiContext db = new BaroneapiContext();

        // GET: api/PedidoModels
        public IQueryable<PedidoModel> GetPedidoModels(long? idEntrega = 0, string idEstado = "all", string fechaDesde = "all", string fechaHasta = "all")
        {
            var param = ParameterExpression.Parameter(typeof(PedidoModel), "x");

            //////PARAMETER of Estado
            var lenEstado = Expression.PropertyOrField(param, "Estado");
            var bodyEstado = Expression.Equal(lenEstado, Expression.Constant(idEstado));

            Expression AllBody = Expression.Equal(Expression.Constant("all"), Expression.Constant("all"));

            if (idEstado != "all")
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


            ////PARAMETER of idEntrega
            var lenidEntrega = Expression.PropertyOrField(param, "idEntrega");
            var bodyidEntrega = Expression.Equal(lenidEntrega, Expression.Convert(Expression.Constant(idEntrega), typeof(long?)));

            //Expression AllBody = Expression.Equal(Expression.Convert(Expression.Constant(idEntrega),typeof(long?)),Expression.Convert(Expression.Constant(idEntrega.Value),typeof(long?)));
            if (idEntrega.Value != 0)
                AllBody = Expression.AndAlso(AllBody, bodyidEntrega);

            Expression<Func<PedidoModel, bool>> lambda = Expression.Lambda<Func<PedidoModel, bool>>(AllBody, new ParameterExpression[] { param });

            return db.PedidoModels.Where(lambda).Include(x=>x.Cliente).Include(y=>y.Entrega).OrderByDescending(x=>x.fechaPedido);
        }

        // GET: api/PedidoModels
        [Route("api/FiltrarPedidos")]
        public IQueryable<PedidoModel> PostFiltrarPedidoModels([FromBody]ReportFilterViewModel model)//long? idEntrega = 0, string idEstado = "all", string fechaDesde = "all", string fechaHasta = "all")
        {
            var param = ParameterExpression.Parameter(typeof(PedidoModel), "x");

            //////PARAMETER of Estado
            var lenEstado = Expression.PropertyOrField(param, "Estado");
            var bodyEstado = Expression.Equal(lenEstado, Expression.Constant(model.Estado.ToString()));

            Expression AllBody = Expression.Equal(Expression.Constant("all"), Expression.Constant("all"));

            if (model.Estado != null && !model.Estado.Equals(0))
                AllBody = Expression.AndAlso(AllBody, bodyEstado);

            ////PARAMETER of NroBarril
            if (!model.FechaDesde.Year.Equals(1))
            {
                //DateTime resultFechaDesde;
                //DateTime.TryParse(fechaDesde, out resultFechaDesde);
                var lenfechaDesde = Expression.PropertyOrField(param, "fechaPactada");
                var bodyfechaDesde = Expression.GreaterThanOrEqual(lenfechaDesde, Expression.Constant(model.FechaDesde));
                AllBody = Expression.AndAlso(AllBody, bodyfechaDesde);

            }

            if (!model.FechaHasta.Year.Equals(1))
            {
                //DateTime resultFechaHasta;
                //DateTime.TryParse(fechaHasta, out resultFechaHasta);
                var lenfechaHasta = Expression.PropertyOrField(param, "fechaPactada");
                var bodyfechaHasta = Expression.LessThanOrEqual(lenfechaHasta, Expression.Constant(model.FechaHasta));

                AllBody = Expression.AndAlso(AllBody, bodyfechaHasta);

            }


            ////PARAMETER of idEntrega
            //var lenidEntrega = Expression.PropertyOrField(param, "idEntrega");
            //var bodyidEntrega = Expression.Equal(lenidEntrega, Expression.Convert(Expression.Constant(model.idEntrega), typeof(long?)));

            ////Expression AllBody = Expression.Equal(Expression.Convert(Expression.Constant(idEntrega),typeof(long?)),Expression.Convert(Expression.Constant(idEntrega.Value),typeof(long?)));
            //if (model.idEntrega.HasValue)
            //    AllBody = Expression.AndAlso(AllBody, bodyidEntrega);
            Expression<Func<PedidoModel, bool>> lambda = Expression.Lambda<Func<PedidoModel, bool>>(AllBody, new ParameterExpression[] { param });

            var result = db.PedidoModels.Where(lambda).Include(x => x.Cliente).Include(y => y.Entrega);

            if (model.RazonSocial != null)
            {
                var result2 = result.Where(x => x.Cliente.RazonSocial.Equals(model.RazonSocial));
                result = result2;
            }

            return result;

         
        }

        // GET: api/PedidoModels/5
        [ResponseType(typeof(PedidoModel))]
        public IHttpActionResult GetPedidoModel(long id)
        {
            PedidoModel pedidoModel = db.PedidoModels.Include(x => x.Cliente).Include(y => y.Entrega).Where(x=>x.idEntrega==id).FirstOrDefault();
            if (pedidoModel == null)
            {
                return NotFound();
            }

            return Ok(pedidoModel);
        }
       
        [AcceptVerbs("PATCH")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PatchPedidoModel(PedidoModel pedido)
        {
            PedidoModel serverDocument = db.PedidoModels.Where(x=>x.idEntrega==pedido.idEntrega).FirstOrDefault();
            if (serverDocument != null) { 
            if (pedido.Estado!=null)
            serverDocument.Estado = pedido.Estado;
            if (pedido.idEntrega != null)
                serverDocument.idEntrega = pedido.idEntrega;

            db.SaveChanges();
          
            }
            return StatusCode(HttpStatusCode.OK);
            //  return StatusCode(HttpStatusCode.NotModified);
        }

        // PUT: api/PedidoModels/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPedidoModel([FromBody] PedidoModel pedidoModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

           if (pedidoModel.Entrega!=null && pedidoModel.Entrega.idEntrega != pedidoModel.idEntrega)
            {
                var entrega = db.MovimientosModels.Where(x => x.idEntrega == pedidoModel.idEntrega).FirstOrDefault();
                pedidoModel.Entrega = entrega;
            }

            db.Entry(pedidoModel).State = EntityState.Modified;

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

        // POST: api/PedidoModels
        [ResponseType(typeof(PedidoModel))]
        public IHttpActionResult PostPedidoModel([FromBody] PedidoModel pedidoModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Entry(pedidoModel.Cliente).State = EntityState.Unchanged;
            db.PedidoModels.Add(pedidoModel);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = pedidoModel.id }, pedidoModel);
        }

        // DELETE: api/PedidoModels/5
        [ResponseType(typeof(PedidoModel))]
        public IHttpActionResult DeletePedidoModel(long id)
        {
            PedidoModel pedidoModel = db.PedidoModels.Find(id);
            if (pedidoModel == null)
            {
                return NotFound();
            }

            db.PedidoModels.Remove(pedidoModel);
            db.SaveChanges();

            return Ok(pedidoModel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PedidoModelExists(long id)
        {
            return db.PedidoModels.Count(e => e.id == id) > 0;
        }
    }
}