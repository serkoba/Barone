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
    [Authorize]
    public class UserModelsController : ApiController
    {
        private BaroneapiContext db = new BaroneapiContext();

        // GET: api/UserModels
        
        public IHttpActionResult GetUserModels(string userProfile = "all")
        {
            if (userProfile != "all")
                return Ok(db.UserModels.Where(x => x.userProfile == userProfile));
            return Ok(db.UserModels);
        }

        // GET: api/UserModels/5
        [ResponseType(typeof(UserModel))]
        public IHttpActionResult GetUserModel(long id)
        {
            UserModel userModel = db.UserModels.Find(id);
            if (userModel == null)
            {
                return NotFound();
            }

            return Ok(userModel);
        }

        // PUT: api/UserModels/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUserModel(long id, UserModel userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userModel.idUser)
            {
                return BadRequest();
            }

            db.Entry(userModel).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/UserModels
        [ResponseType(typeof(UserModel))]
        public IHttpActionResult PostUserModel(UserModel userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.UserModels.Add(userModel);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = userModel.idUser }, userModel);
        }

        // DELETE: api/UserModels/5
        [ResponseType(typeof(UserModel))]
        public IHttpActionResult DeleteUserModel(long id)
        {
            UserModel userModel = db.UserModels.Find(id);
            if (userModel == null)
            {
                return NotFound();
            }

            db.UserModels.Remove(userModel);
            db.SaveChanges();

            return Ok(userModel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserModelExists(long id)
        {
            return db.UserModels.Count(e => e.idUser == id) > 0;
        }
    }
}