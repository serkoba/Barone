﻿using System;
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
using System.Data.Entity.Core;
using System.Threading.Tasks;

namespace Barone.api.Controllers
{
    [Authorize]
    public class BarrilModelsController : ApiController
    {
        private BaroneapiContext db = new BaroneapiContext();

        // GET: api/BarrilModels
        public IQueryable<BarrilModel> GetBarrilModels(string NroBarril= "all",int? idEstado = 0, int? IdEstilo = 0, string razonSocial =null)
        {
            var param = ParameterExpression.Parameter(typeof(BarrilModel), "x");

            ////PARAMETER of NroBarril
            var lenNroBarril = Expression.PropertyOrField(param, "NroBarril");
            var bodyNroBarril = Expression.Equal(lenNroBarril, Expression.Constant(NroBarril));
         
            //////PARAMETER of Estado
            var lenEstado = Expression.PropertyOrField(param, "idEstado");
            var bodyEstado = Expression.Equal(lenEstado, Expression.Convert(Expression.Constant(idEstado.Value), typeof(int)));

            //////PARAMETER Tipo Barril 
            var lenTipoBarril = Expression.PropertyOrField(param, "IdEstilo");
            var bodyTipoBarril = Expression.Equal(lenTipoBarril,Expression.Convert(Expression.Constant(IdEstilo.Value),typeof(int?)));

            ////PARAMETER of NroBarril
          //  var lenRazonSocial = Expression.PropertyOrField(param, "RazonSocial");
         //   var bodyRazonSocial = Expression.Equal(lenRazonSocial, Expression.Constant(razonSocial));


            Expression AllBody = Expression.Equal(Expression.Constant(NroBarril), Expression.Constant(NroBarril));
            if (NroBarril != "all")
                AllBody = Expression.AndAlso(AllBody, bodyNroBarril);
            if (idEstado.Value != 0)
                AllBody = Expression.AndAlso(AllBody, bodyEstado);
            if (IdEstilo.Value != 0)
                AllBody = Expression.AndAlso(AllBody, bodyTipoBarril);
          //  if (razonSocial != "all")
          //      AllBody = Expression.AndAlso(AllBody, bodyRazonSocial);

            Expression<Func<BarrilModel, bool>> lambda = Expression.Lambda<Func<BarrilModel, bool>>(AllBody, new ParameterExpression[] { param });

            
                var result= db.BarrilModels.Where(lambda).Include(x=>x.Entrega).Include(x=>x.Entrega.Cliente).Include(x=>x.Estilo).Include(x => x.Estilo.rangoPrecio).Include(x=>x.Coccion);

            if (razonSocial != null)
            {
                var result2 = result.Where(x => x.Entrega.Cliente.RazonSocial.Equals(razonSocial));
                result = result2;
            }

                /*    var resultFilter = from b in result
                                       select new BarrilModel()
                                       {
                                           CantidadLitros = b.CantidadLitros,
                                           id = b.id,
                                           idEntrega = b.idEntrega,
                                           idEstado = b.idEstado,
                                           IdEstilo = b.IdEstilo,
                                           Estilo = db.EstilosModels.Where(x => x.IdEstilo == b.IdEstilo).FirstOrDefault()

                                       };*/
                return result;
            
        }

        // GET: api/BarrilModels
        [Route("api/FiltrarBarriles")]
        public IQueryable<BarrilModel> PostFiltrarBarriles([FromBody]ReportFilterViewModel model)   
        {
            Expression AllBody = Expression.Equal(Expression.Constant("x"), Expression.Constant("x"));
            var param = ParameterExpression.Parameter(typeof(BarrilModel), "x");
            if (model != null)
            {
              

                ////PARAMETER of NroBarril
                var lenNroBarril = Expression.PropertyOrField(param, "NroBarril");
                var bodyNroBarril = Expression.Equal(lenNroBarril, Expression.Constant(model.NroBarril));

                //////PARAMETER of Estado
                var lenEstado = Expression.PropertyOrField(param, "idEstado");
                var bodyEstado = Expression.Equal(lenEstado, Expression.Convert(Expression.Constant(model.Estado), typeof(int)));

                //////PARAMETER Tipo Barril 
                var lenTipoBarril = Expression.PropertyOrField(param, "IdEstilo");
                var bodyTipoBarril = Expression.Equal(lenTipoBarril, Expression.Convert(Expression.Constant(model.Estilo), typeof(int?)));

                if (model.NroBarril != "")
                    AllBody = Expression.AndAlso(AllBody, bodyNroBarril);
                if (model.Estado != 0)
                    AllBody = Expression.AndAlso(AllBody, bodyEstado);
                if (model.Estilo != 0)
                    AllBody = Expression.AndAlso(AllBody, bodyTipoBarril);
            }
            //if (model.ClientFilter.RazonSocial != "all")
            //{
            //    ////PARAMETER of RazonSocial
            //    var lenRazonSocial = Expression.PropertyOrField(param, "RazonSocial");
            //    var bodyRazonSocial = Expression.Equal(lenRazonSocial, Expression.Constant(model.ClientFilter.RazonSocial));
            //    AllBody = Expression.AndAlso(AllBody, bodyRazonSocial);
            //}
               

            Expression<Func<BarrilModel, bool>> lambda = Expression.Lambda<Func<BarrilModel, bool>>(AllBody, new ParameterExpression[] { param });


            var result = db.BarrilModels.Where(lambda).Include(x=>x.Entrega).Include(x=>x.Entrega.Cliente).Include(x => x.Estilo).Include(x => x.Estilo.rangoPrecio).Include(x=>x.Coccion);

            if (model.RazonSocial != null)
            {
                var result2 = result.Where(x => x.Entrega.Cliente.RazonSocial.Equals(model.RazonSocial));
                result = result2;
            }

                //var resultFilter = from b in result
                //                   select new BarrilModel()
                //                   {
                //                       CantidadLitros = b.CantidadLitros,
                //                       id = b.id,
                //                       idEntrega = b.idEntrega,
                //                       idEstado = b.idEstado,
                //                       IdEstilo = b.IdEstilo,
                //                       Estilo = db.EstilosModels.Where(x => x.IdEstilo == b.IdEstilo).FirstOrDefault()

                //                   };
            return result;

        }
        // GET: api/BarrilModels
        [Route("api/BarrilesAgrupados")]
        public IEnumerable<BarrilXEstadoReporte> GetBarrilModelsAgrupados()
        {


            var result = (from b in db.BarrilModels
                         group b by b.idEstado into x
                         select new BarrilXEstadoReporte
                         {
                             Estado =x.Key.ToString(),
                             TotalBarriles = x.Count()
                         }).AsEnumerable()
                         .Select(x=> new BarrilXEstadoReporte()
                         {
                             Estado = ConvertToStringEstado(x.Estado),
                             TotalBarriles = x.TotalBarriles
                         }
                         );
                             
                         
                                  
            return result;

        }
        [Route("api/BarrilesAgrupadosByEstilo/{idEstado}")]
        public IEnumerable<BarrilXEstadoReporte> GetBarrilModelsAgrupadosByEstilos(int? idEstado)
        {
            var groupedBarrels = (from b in db.BarrilModels
                                  where (!idEstado.HasValue || b.idEstado == idEstado.Value)
                                  group b by b.IdEstilo into x
                                  select new BarrilXEstadoReporte
                                  {
                                      Estado = x.Key.ToString(),
                                      TotalBarriles = x.Count()
                                  }
                          );

            var result = (from b in groupedBarrels
                          join e in db.EstilosModels.DefaultIfEmpty() on b.Estado equals e.IdEstilo.ToString()


                          select  new BarrilXEstadoReporte
                          {
                              Estado = e.Nombre,
                              TotalBarriles = b.TotalBarriles
                          }
                         );



            return result;

        }
       private string GetNombreEstilo(string id)
        {
            return db.EstilosModels.FirstOrDefault(x => x.IdEstilo == int.Parse(id)).Nombre;
        }
        private string ConvertToStringEstado(string key)
        {

            return key =="1" ? "Para Despacho" : key == "2" ? "Entregadas" : key == "3" ? "En Progreso" : key == "4" ? "Reservado" : "Invalido";
        }


        // GET: api/BarrilModels/5
        [ResponseType(typeof(BarrilModel))]
        public IHttpActionResult GetBarrilModel(int id)
        {
            BarrilModel barrilModel = db.BarrilModels.Include(x => x.Estilo).Where(y => y.id == id).Include(x => x.Estilo.rangoPrecio).FirstOrDefault();
            if (barrilModel == null)
            {
                return NotFound();
            }

            return Ok(barrilModel);
        }

        // PUT: api/BarrilModels/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBarrilModel( [FromBody] BarrilModel barrilModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //if (id != barrilModel.id)
            //{
            //    return BadRequest();
            //}

            db.Entry(barrilModel).State = EntityState.Modified;

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

        // POST: api/BarrilModels
        [Route("api/InsertBarrilModels")]
        [ResponseType(typeof(BarrilModel))]
        public IHttpActionResult PostBarrilModel([FromBody] BarrilModel barrilModel)
        {
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
          

                if (barrilModel.Coccion != null)
                {
                barrilModel.Coccion.Receta = null;
                //db.EstilosModels.Attach(barrilModel.Coccion.Receta.Estilo);
                //ctx.Entry(barrilModel.Coccion.Receta.Estilo).State = EntityState.Detached;
                //db.RecetaModels.Attach(barrilModel.Coccion.Receta);
                db.CoccionModels.Attach(barrilModel.Coccion);
                db.EstilosModels.Attach(barrilModel.Estilo);
                //ctx.Entry(barrilModel.Coccion.Receta).State = EntityState.Detached;
                //db.Entry(barrilModel.Coccion.Receta).State = EntityState.Unchanged;

                //ctx.Entry(barrilModel.Coccion).State = EntityState.Unchanged;

            }
                
             
                    
                if (barrilModel.Entrega != null)
                db.Entry(barrilModel.Entrega).State = EntityState.Unchanged;
               
            
            db.BarrilModels.Add(barrilModel);
            db.SaveChanges();

            return Ok(new { id = barrilModel.id });
          //  return CreatedAtRoute("DefaultApi", new { id = barrilModel.id }, barrilModel);
        }


        [ResponseType(typeof(void))]
        [Route("api/UpdateAllBarril")]
        public IHttpActionResult UpdateAllBarrilModel([FromBody] BarrilModel barrilModel)
        {
            db.BarrilModels.ToList().ForEach(barril =>
            {
                if (barrilModel.idEstado != 0)
                    barril.idEstado = barrilModel.idEstado;
                if (barril.idEntrega != null)
                    barril.idEntrega = barrilModel.idEntrega;
                if (barrilModel.IdEstilo != null)
                    barril.IdEstilo = barrilModel.IdEstilo;
                db.Entry(barril).State = EntityState.Modified;
           
            });
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            

            db.SaveChanges();
            return StatusCode(HttpStatusCode.OK);
        }
        public void HaveUserResolveConcurrency(BarrilModel entity,
                                       BarrilModel databaseValues,
                                       BarrilModel resolvedValues)
        {
            // Show the current, database, and resolved values to the user and have
            // them update the resolved values to get the correct resolution.
        }

        [AcceptVerbs("PATCH")]
        [ResponseType(typeof(void))]
        public  IHttpActionResult PatchBarrilModel([FromBody] BarrilModel barril)
        {


            try
            {
            BarrilModel serverDocument = db.BarrilModels.Where(x => x.NroBarril == barril.NroBarril).Include(x=>x.Coccion).SingleOrDefault();
              //  barril.id = serverDocument.id;
            if (barril.idEstado != 0)
                    serverDocument.idEstado = barril.idEstado;
            if (barril.idEntrega != null)
                    serverDocument.idEntrega = barril.idEntrega;
            if (barril.IdEstilo != null)
                    serverDocument.IdEstilo = barril.IdEstilo;
            if (barril.Coccion != null)
            {
                    //barril.Coccion = serverDocument.Coccion;
                    //serverDocument.Coccion = barril.Coccion;
                    //   db.Entry(barril.Coccion).State = EntityState.Unchanged;

                    serverDocument.Coccion_id = barril.Coccion_id;
                    //db.Entry(serverDocument).Reference(x => x.Coccion).CurrentValue = barril.Coccion;
                   // serverDocument.Coccion = barril.Coccion;
                   
                    //db.Entry(serverDocument.Coccion).State = EntityState.Unchanged;
                    //db.Entry(serverDocument.Coccion.Receta).State = EntityState.Unchanged;
                    //db.Entry(serverDocument.Coccion.Fermentador).State = EntityState.Unchanged;
                }

                db.Entry(barril).State = EntityState.Detached;
                //db.Entry(serverDocument).CurrentValues.SetValues(barril);
                //db.Entry(serverDocument.Coccion).State = EntityState.Unchanged;
                //db.Entry(serverDocument).State = EntityState.Modified;

                //db.Entry(serverDocument.Coccion).State = EntityState.Unchanged;
                //db.Entry(serverDocument).State = EntityState.Modified;
                //db.Entry(barril).State = EntityState.Added;
                //db.Entry(barril.Coccion).State = EntityState.Detached;

                
        

             db.SaveChanges();
            }
            catch (OptimisticConcurrencyException ex)
            {
               
                var result = ex.Data;
            }
            return StatusCode(HttpStatusCode.OK);
        }

        // DELETE: api/BarrilModels/5
        [ResponseType(typeof(BarrilModel))]
        public IHttpActionResult DeleteBarrilModel(int id)
        {
            BarrilModel barrilModel = db.BarrilModels.Find(id);
            if (barrilModel == null)
            {
                return NotFound();
            }

            db.BarrilModels.Remove(barrilModel);
            db.SaveChanges();

            return Ok(barrilModel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BarrilModelExists(int id)
        {
            return db.BarrilModels.Count(e => e.id == id) > 0;
        }
    }
}