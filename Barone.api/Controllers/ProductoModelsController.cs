using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Core;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Barone.api.DTO;
using Barone.api.Models;

namespace Barone.api.Controllers
{
    public class ProductoModelsController : ApiController
    {
        private BaroneapiContext db = new BaroneapiContext();

        // GET: api/ProductoModels

        public IQueryable<ProductoModel> GetProductoModels()
        {
            return db.ProductoModels;
        }
        [Route("api/ProductoModelsDetail")]
        public IQueryable<ProductsDTO> GetProductoModelsDetail()
        {
            var stockmodelsAll = db.StockProductoModels
                         .Include(x => x.Coccion).Include(x => x.Producto)
                         .Include(x => x.Coccion.Receta).Include(x => x.Coccion.Receta.Estilo).Include(x => x.Coccion.Receta.Estilo.rangoPrecio);

            var result = from p in db.ProductoModels
                         join st in
                         (from stock in stockmodelsAll
                          select new {
                              Producto= stock.Producto,
                              Fecha= stock.Fecha,
                              Precio = stock.Coccion.Receta.Estilo.rangoPrecio.precio
                          })
                         .OrderByDescending(x => x.Fecha).DefaultIfEmpty() on p.id equals st.Producto.id into joinSt
                         from st in joinSt
                          .Take(1)
                         
                         
                         select new ProductsDTO()
                         {
                             id = p.id,
                             Litros = p.Litros,
                             Nombre = p.Nombre,
                             Stock = p.Stock,
                             Precio = st.Precio
                         };
            return result;
        }

        // GET: api/ProductoModels/5
        [ResponseType(typeof(ProductoModel))]
        public IHttpActionResult GetProductoModel(int id)
        {
            ProductoModel productoModel = db.ProductoModels.Find(id);
            if (productoModel == null)
            {
                return NotFound();
            }

            return Ok(productoModel);
        }

        // PUT: api/ProductoModels/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProductoModel([FromBody] ProductoModel productoModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            

            db.Entry(productoModel).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return Ok();
        }

        // POST: api/ProductoModels
        [ResponseType(typeof(ProductoModel))]
        public IHttpActionResult PostProductoModel(ProductoModel productoModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ProductoModels.Add(productoModel);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = productoModel.id }, productoModel);
        }

        // POST: api/ProductoModels
        [Route("api/UpdatePartialStockProducto")]
        [ResponseType(typeof(ProductoModel))]
        public IHttpActionResult PostProductoModel(StockProductoModel stockProducto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            stockProducto.Fecha = DateTime.UtcNow;
            stockProducto.Producto.Stock += stockProducto.Cantidad;
            db.Entry(stockProducto.Coccion).State = EntityState.Unchanged;
            db.Entry(stockProducto.Producto).State = EntityState.Modified;
            db.StockProductoModels.Add(stockProducto);
            db.SaveChanges();

            return Ok();
        }


        [ResponseType(typeof(void))]
        [Route("api/UpdateAllProductos")]
        public IHttpActionResult UpdateAllProductosModel([FromBody] StockProductoModel stockProductoModel)
        {
            var today = DateTime.UtcNow;
            db.ProductoModels.ToList().ForEach(producto =>
            {
                var newElement = new StockProductoModel()
                {
                    Cantidad = stockProductoModel.Cantidad,
                    Coccion = stockProductoModel.Coccion,
                    Fecha = today,
                    Producto = producto

                };
                producto.Stock += stockProductoModel.Cantidad;
                db.Entry(newElement.Coccion).State = EntityState.Unchanged;
                db.Entry(newElement.Producto).State = EntityState.Unchanged;

                db.StockProductoModels.Add(newElement);

            });
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }



            db.SaveChanges();
            return StatusCode(HttpStatusCode.OK);
        }

        // DELETE: api/ProductoModels/5
        [ResponseType(typeof(ProductoModel))]
        public IHttpActionResult DeleteProductoModel(int id)
        {
            ProductoModel productoModel = db.ProductoModels.Find(id);
            if (productoModel == null)
            {
                return NotFound();
            }

            db.ProductoModels.Remove(productoModel);
            db.SaveChanges();

            return Ok(productoModel);
        }

        [AcceptVerbs("PATCH")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PatchProductoModel([FromBody] ProductoModel producto)
        {


            try
            {
                ProductoModel serverDocument = db.ProductoModels.Find(producto.id);

                //   serverDocument.SaldoCuenta = cliente.SaldoCuenta;
                // db.Entry(serverDocument).State = EntityState.Modified;

                dynamic changedData = new { Stock = producto.Stock };
                db.Entry(serverDocument).CurrentValues.SetValues(changedData);




                db.SaveChanges();
            }
            catch (OptimisticConcurrencyException ex)
            {

                var result = ex.Data;
            }
            return StatusCode(HttpStatusCode.OK);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductoModelExists(int id)
        {
            return db.ProductoModels.Count(e => e.id == id) > 0;
        }
    }
}