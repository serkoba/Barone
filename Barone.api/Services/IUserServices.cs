using Barone.api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Barone.api.Services
{
    public interface IUserServices
    {
        UserModel Authenticate(string userName, string password);
    }
}