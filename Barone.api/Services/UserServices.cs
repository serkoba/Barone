using Barone.api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Barone.api.Services
{
    public class UserServices : IUserServices
    {

        private BaroneapiContext db = new BaroneapiContext();
        /// <summary>
        /// Public method to authenticate user by user name and password.
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public UserModel Authenticate(string userName, string password)
        {
            var user  = db.UserModels.Where(x=> x.userProfile== userName && x.pass==password ).FirstOrDefault();
            if (user != null && user.idUser > 0)
            {
                return user;
            }
            return null;
        }
    }
}