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
using System.Reflection;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Barone.api.Controllers
{
    [Authorize]
    public class ClientesModelsController : ApiController
    {
        private BaroneapiContext db = new BaroneapiContext();



        // GET: api/ClientesModels
        public IHttpActionResult GetClientesModels(string name="all")
        {

            if (name != "all")
                return Ok(db.ClientesModels.Where(x => x.RazonSocial == name));
            return Ok(db.ClientesModels);

           

          
        }
        private string convertToJson(Object result)
        {
            var settings = new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };

            var json = JsonConvert.SerializeObject(result, settings);
            return json;
        }

        //public HttpResponseMessage Get(string gender = "All")
        //{
        //    IList<ClientesModel> clientesModel = db.ClientesModels.Where(x => x.Nombre == gender).ToList();

        //    return Request.CreateResponse(HttpStatusCode.OK, clientesModel);
            
        //}

        // GET: api/ClientesModels/5
        [ResponseType(typeof(ClientesModel))]
        public IHttpActionResult GetClientesModel(int id)
        {
            ClientesModel clientesModel = db.ClientesModels.Find(id);
            if (clientesModel == null)
            {
                return NotFound();
            }

            return Ok(clientesModel);
        }

        // PUT: api/ClientesModels/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutClientesModel([FromBody] ClientesModel clientesModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

          

            db.Entry(clientesModel).State = EntityState.Modified;

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

        // POST: api/ClientesModels
        [ResponseType(typeof(ClientesModel))]
        public IHttpActionResult PostClientesModel([FromBody]ClientesModel clientesModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ClientesModels.Add(clientesModel);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = clientesModel.IdCliente }, clientesModel);
        }



        [HttpPatch]
        [ResponseType(typeof(void))]
        public IHttpActionResult PatchClientesModel([FromBody] ClientesModel cliente)
        {
            ClientesModel serverDocument = db.ClientesModels.Find(cliente.IdCliente);

           //   serverDocument.SaldoCuenta = cliente.SaldoCuenta;
           // db.Entry(serverDocument).State = EntityState.Modified;
            
              dynamic changedData = new { SaldoCuenta= cliente.SaldoCuenta };
              db.Entry(serverDocument).CurrentValues.SetValues(changedData);

            /*
            PropertyInfo[] properties = serverDocument.GetType().GetProperties();
            foreach (PropertyInfo propertyInfo in properties)
            {
                if (propertyInfo.GetValue(cliente, null) != null)
                {
                    propertyInfo.SetValue(serverDocument, propertyInfo.GetValue(cliente, null), null);
                }
            }*/
            //  serverDocument.ModifiedDate = DateTime.UtcNow;
            //  db.Entry(serverDocument).State = EntityState.Modified;
            // db.Entry(serverDocument).Property(e => e.CreatedDate).IsModified = false;
            //  db.Entry(UpdateModelItem).CurrentValues.SetValues(cliente);



              db.SaveChanges();
            return StatusCode(HttpStatusCode.OK);
        }

        // DELETE: api/ClientesModels/5
        [ResponseType(typeof(ClientesModel))]
        public IHttpActionResult DeleteClientesModel(int id)
        {
            try
            {


                ClientesModel clientesModel = db.ClientesModels.Find(id);
                if (clientesModel == null)
                {
                    return NotFound();
                }

                db.ClientesModels.Remove(clientesModel);
                db.SaveChanges();

                return Ok(clientesModel);
            }
            catch(Exception ex)
            {
                return BadRequest("Este Cliente tiene Pedidos Asociados");
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ClientesModelExists(int id)
        {
            return db.ClientesModels.Count(e => e.IdCliente == id) > 0;
        }
    }
}