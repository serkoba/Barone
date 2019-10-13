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
    public class ProductoModelsController : ApiController
    {
        private BaroneapiContext db = new BaroneapiContext();

        // GET: api/ProductoModels
        public IQueryable<ProductoModel> GetProductoModels()
        {
            return db.ProductoModels;
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