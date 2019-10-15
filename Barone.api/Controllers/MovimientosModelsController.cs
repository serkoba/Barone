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
using System.Data.Entity.SqlServer;
using Newtonsoft.Json;
using Barone.api.Extension;

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

            var result = db.MovimientosModels.Where(lambda).Include(x => x.Cliente).OrderByDescending(x => x.fechaPactada) ;
            return result;// db.MovimientosModels.Include(x=>x.Cliente);
        }

        [Route("api/MovimientosByCliente")]
        public IEnumerable<GroupByEstilo> PostMovimientosByCliente([FromBody] ReportFilterViewModel model)
        {
            var result = FiltrarMovimientosModels(model);

            var result2 = (from b in result
                           group b by b.Cliente.RazonSocial into x
                           select new GroupByEstilo
                           {
                               Estilo = x.Key.ToString(),
                               CantidadBarriles = x.Sum(y=> y.TotalBarriles),
                               CantidadLitros= x.Sum(y=>y.TotalLitros)
                           }).AsEnumerable();



            return result2;

        }

        [Route("api/MovimientosAgrupados")]
        public IEnumerable<MovimientosXFecha> PostMovimientosModelsAgrupados([FromBody] ReportFilterViewModel model)
        {
            var result = FiltrarMovimientosModels(model);

            var result2 = (from b in result
                           group b by DbFunctions.TruncateTime(b.fechaPactada) into x
                          select new MovimientosXFecha
                          {
                              Fecha = x.Key.ToString(),
                              data = x.GroupBy(movEst=> movEst.Estado).Select(mov=> new MovimientoEstado() {label= mov.Key.ToString(),   data= mov.Count() }).ToList()
                          }).AsEnumerable();



            return result2;

        }

        [Route("api/FiltrarMovimientos")]
        public IQueryable<MovimientosModel> PostFiltrarMovimientosModels([FromBody] ReportFilterViewModel model)
        {
            return FiltrarMovimientosModels(model);
        }


        [Route("api/MovimientosModelsGroupByEstilos")]
        public IHttpActionResult PostMovimientosModelsGroupByEstilos([FromBody] ReportFilterViewModel model)
        {
            try
            {
                
               
                    var totalByEstilos = new List<GroupByEstilo>();
                    foreach (var movimiento in FiltrarMovimientosModels(model))
                    {
                        var detallePedidos = JsonConvert.DeserializeObject<IList<DetalleMovimientos>>(movimiento.DetallePedido);
                        var queryDetallePedido = from det in detallePedidos
                                                 group det by det.Tipo into detGroup
                                                 select new GroupByEstilo
                                                 {
                                                     Estilo = detGroup.Key,
                                                     CantidadLitros = (from barriles in detGroup.SelectMany(x => x.BarrilesEntrega)
                                                                       join barr in db.BarrilModels on barriles.nombre equals barr.NroBarril
                                                                       select barr.CantidadLitros.ToNullableInt()).Sum(),
                                                     CantidadBarriles = detGroup.SelectMany(x => x.BarrilesEntrega).Count()


                                                 };
                        totalByEstilos.AddRange(queryDetallePedido);

                    }

                    var groupByEstilo = totalByEstilos.GroupBy(x => x.Estilo, (estilos, totals) => new GroupByEstilo
                    {
                        Estilo = estilos,
                        CantidadLitros = totals.Sum(x => x.CantidadLitros),
                        CantidadBarriles = totals.Sum(x => x.CantidadBarriles)
                    });

               


                return Ok(groupByEstilo);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.InnerException.Message);
            }

        }


        [Route("api/MovimientosModelsGroupByClientEstilos")]
        public IHttpActionResult PostMovimientosModelsGroupByClientEstilos([FromBody] ReportFilterViewModel model)
        {
            try
            {

            
            //var result = db.MovimientosModels.Where(lambda).Include(x => x.Cliente);
            //return result;// db.MovimientosModels.Include(x=>x.Cliente);
            //var EstadoBlank = (!model.Estado.HasValue || model.Estado.Value.Equals(0));
            //var FechaDesdeHastaBlank = (model.FechaDesde.Year == 1 && model.FechaHasta.Year == 1);
            //var ClientBlank = model.RazonSocial == null;
            //var resultQuery = from mov in db.MovimientosModels
            //                  join cli in db.ClientesModels on mov.IdCliente equals cli.IdCliente
            //                  where (EstadoBlank || model.Estado.Value == mov.Estado)
            //                  && (FechaDesdeHastaBlank || (model.FechaDesde<= mov.fechaPactada && model.FechaHasta>=mov.fechaPactada))
            //                  && (ClientBlank || model.RazonSocial== cli.RazonSocial)
            //                  group mov by mov.IdCliente into movGroup
            //                  select new { Cliente = movGroup.FirstOrDefault().Cliente, movimientos = movGroup };
            var filteredMov = from mov in FiltrarMovimientosModels(model)
                              join cli in db.ClientesModels on mov.IdCliente equals cli.IdCliente
                              group mov by mov.IdCliente into movGroup
                              select new { Cliente = movGroup.FirstOrDefault().Cliente, movimientos = movGroup };




            var result = new List<MovimientosXEstilos>();
            //filteredMov.AsParallel().ForAll(mov =>
            //{
            //    var totalByEstilos = new List<GroupByEstilo>();

            //    foreach (var movimiento in mov.movimientos)
            //    {
            //        var detallePedidos = JsonConvert.DeserializeObject<IList<DetalleMovimientos>>(movimiento.DetallePedido);
            //        var queryDetallePedido = from det in detallePedidos
            //                                 group det by det.Tipo into detGroup
            //                                 select new GroupByEstilo
            //                                 {
            //                                     Estilo = detGroup.Key,
            //                                     CantidadLitros = (from barriles in detGroup.SelectMany(x => x.BarrilesEntrega)
            //                                                       join barr in db.BarrilModels on barriles.nombre equals barr.NroBarril
            //                                                       select barr.CantidadLitros.ToNullableInt()).Sum(),
            //                                     CantidadBarriles = (from barriles in detGroup.SelectMany(x => x.BarrilesEntrega)
            //                                                         select barriles).Count()

            //                                 };
            //        totalByEstilos.AddRange(queryDetallePedido);

            //    }

            //    var groupByCliente = totalByEstilos.GroupBy(x => x.Estilo, (estilos, totals) => new GroupByEstilo
            //    {
            //        Estilo = estilos,
            //        CantidadLitros = totals.Sum(x => x.CantidadLitros),
            //        CantidadBarriles = totals.Sum(x => x.CantidadBarriles)
            //    });

            //    result.Add(new { mov.Cliente, Totales = groupByCliente });

            //});
            foreach (var mov in filteredMov)
            {
                var totalByEstilos = new List<GroupByEstilo>();
                foreach (var movimiento in mov.movimientos)
                {
                    var detallePedidos = JsonConvert.DeserializeObject<IList<DetalleMovimientos>>(movimiento.DetallePedido);
                    var queryDetallePedido = from det in detallePedidos
                                             group det by det.Tipo into detGroup
                                             select new GroupByEstilo
                                             {
                                                 Estilo = detGroup.Key,
                                                 CantidadLitros = (from barriles in detGroup.SelectMany(x => x.BarrilesEntrega)
                                                                   join barr in db.BarrilModels on barriles.nombre equals barr.NroBarril
                                                                   select barr.CantidadLitros.ToNullableInt()).Sum(),
                                                 CantidadBarriles = detGroup.SelectMany(x => x.BarrilesEntrega).Count()
                                                                     

                                             };
                    totalByEstilos.AddRange(queryDetallePedido);

                }

                var groupByCliente = totalByEstilos.GroupBy(x => x.Estilo, (estilos, totals) => new GroupByEstilo
                {
                    Estilo = estilos,
                    CantidadLitros = totals.Sum(x => x.CantidadLitros),
                    CantidadBarriles = totals.Sum(x => x.CantidadBarriles)
                });

                result.Add(new MovimientosXEstilos { Cliente= mov.Cliente, Totales = groupByCliente });

            }


            return Ok(result);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.InnerException.Message);
            }

        }

        [Route("api/MovimientosModelsGroupByClient")]
        public IHttpActionResult PostFiltrarEstadoMovimientosModels([FromBody] ReportFilterViewModel model)
        {
           
            //var result = db.MovimientosModels.Where(lambda).Include(x => x.Cliente);
            //return result;// db.MovimientosModels.Include(x=>x.Cliente);
            //var EstadoBlank = (!model.Estado.HasValue || model.Estado.Value.Equals(0));
            //var FechaDesdeHastaBlank = (model.FechaDesde.Year == 1 && model.FechaHasta.Year == 1);
            //var ClientBlank = model.RazonSocial == null;
            //var resultQuery = from mov in db.MovimientosModels
            //                  join cli in db.ClientesModels on mov.IdCliente equals cli.IdCliente
            //                  where (EstadoBlank || model.Estado.Value == mov.Estado)
            //                  && (FechaDesdeHastaBlank || (model.FechaDesde<= mov.fechaPactada && model.FechaHasta>=mov.fechaPactada))
            //                  && (ClientBlank || model.RazonSocial== cli.RazonSocial)
            //                  group mov by mov.IdCliente into movGroup
            //                  select new { Cliente = movGroup.FirstOrDefault().Cliente, movimientos = movGroup };

            var resultQuery = from mov in  FiltrarMovimientosModels(model)
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
            db.Entry(movimientosModel.Cliente).State = EntityState.Unchanged;
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
            //remove all barril related
            var barrilToUpdate = db.BarrilModels.Where(x => x.idEntrega == movimientosModel.idEntrega);
            if (barrilToUpdate != null)
            {
                barrilToUpdate.ForEachAsync(barril =>
                {
                    barril.idEntrega = null;
                    barril.Entrega = null;
                    barril.idEstado = 1;
                });
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

        private string ConvertToStringEstado(int key)
        {

            return key == 1 ? "Pendiente" : key == 2 ? "En Progreso" : key == 3 ? "Entregado" :  "Invalido";
        }
        private bool MovimientosModelExists(long id)
        {
            return db.MovimientosModels.Count(e => e.idEntrega == id) > 0;
        }
        private IQueryable<MovimientosModel> FiltrarMovimientosModels(ReportFilterViewModel model)
        {
            var param = ParameterExpression.Parameter(typeof(MovimientosModel), "x");

            //////PARAMETER of Estado
            var lenEstado = Expression.PropertyOrField(param, "Estado");
            var bodyEstado = Expression.Equal(lenEstado, Expression.Convert(Expression.Constant(model.Estado), typeof(int)));

            Expression AllBody = Expression.Equal(Expression.Constant("all"), Expression.Constant("all"));

            if (!model.Estado.Equals(0))
                AllBody = Expression.AndAlso(AllBody, bodyEstado);

            ////PARAMETER of NroBarril
            if (!model.FechaDesde.Year.Equals(1))
            {
                var lenfechaDesde = Expression.PropertyOrField(param, "fechaPactada");
                var bodyfechaDesde = Expression.GreaterThanOrEqual(lenfechaDesde, Expression.Constant(model.FechaDesde));
                AllBody = Expression.AndAlso(AllBody, bodyfechaDesde);

            }

            if (!model.FechaHasta.Year.Equals(1))
            {

                var lenfechaHasta = Expression.PropertyOrField(param, "fechaPactada");
                var bodyfechaHasta = Expression.LessThanOrEqual(lenfechaHasta, Expression.Constant(model.FechaHasta));

                AllBody = Expression.AndAlso(AllBody, bodyfechaHasta);

            }


            Expression<Func<MovimientosModel, bool>> lambda = Expression.Lambda<Func<MovimientosModel, bool>>(AllBody, new ParameterExpression[] { param });

            var result = db.MovimientosModels.Where(lambda).Include(x => x.Cliente);
            if (model.RazonSocial != null)
            {
                var result2 = result.Where(x => x.Cliente.RazonSocial.Equals(model.RazonSocial));
                result = result2;
            }
            return result;// db.MovimientosModels.Include(x=>x.Cliente);

        }
    }
}