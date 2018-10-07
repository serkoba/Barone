using Barone.api.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Http.Controllers;

namespace Barone.api.Filters
{
    public class ApiAuthenticationFilter: GenericAuthenticationFilter
    {

        /// <summary>
        /// Default Authentication Constructor
        /// </summary>
        public ApiAuthenticationFilter()
        {
        }

        /// <summary>
        /// AuthenticationFilter constructor with isActive parameter
        /// </summary>
        /// <param name="isActive"></param>
        public ApiAuthenticationFilter(bool isActive)
            : base(isActive)
        {
        }
        protected override bool OnAuthorizeUser(string username, string password, HttpActionContext actionContext)
        {
           // var provider = actionContext.ControllerContext.Configuration
           //                    .DependencyResolver.GetService(typeof(IUserServices)) as IUserServices;
            UserServices provider = new UserServices();
            
            if (provider != null)
            {
                var userId = provider.Authenticate(username, password);
                if (userId > 0)
                {
                    var basicAuthenticationIdentity = Thread.CurrentPrincipal.Identity as BasicAuthenticationIdentity;
                    if (basicAuthenticationIdentity != null)
                        basicAuthenticationIdentity.UserId = userId;
                    return true;
                }
            }
            return false;
        }
    }
}