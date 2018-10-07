using Barone.api.Filters;
using Barone.api.Services;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Barone.api.Controllers
{
    [Authorize]
    public class AuthenticateController : ApiController
    {

        #region Private variable.

        private readonly TokenServices _tokenServices;

        #endregion

        #region Public Constructor

        /// <summary>
        /// Public constructor to initialize product service instance
        /// </summary>
        public AuthenticateController(TokenServices tokenServices)
        {
            _tokenServices = tokenServices;
        }

        public AuthenticateController()
        {
            TokenServices tokenServices = new TokenServices();
            _tokenServices = tokenServices;
        }

        #endregion

        /// <summary>
        /// Authenticates user and returns token with expiry.
        /// </summary>
        /// <returns></returns>
        public HttpResponseMessage Authenticate()
        {
            if (System.Threading.Thread.CurrentPrincipal != null && System.Threading.Thread.CurrentPrincipal.Identity.IsAuthenticated)
            {
                var basicAuthenticationIdentity = System.Threading.Thread.CurrentPrincipal.Identity as BasicAuthenticationIdentity;
                if (basicAuthenticationIdentity != null)
                {
                    var userId = basicAuthenticationIdentity.UserId;
                    return GetAuthToken(userId);
                }
            }
            return null;
        }

        /// <summary>
        /// Returns auth token for the validated user.
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        private HttpResponseMessage GetAuthToken(long userId)
        {
            var token = _tokenServices.GenerateToken(userId);
            var response = Request.CreateResponse(HttpStatusCode.OK, token.AuthToken);
            response.Headers.Add("Token", token.AuthToken);
            response.Headers.Add("TokenExpiry", ConfigurationManager.AppSettings["AuthTokenExpiry"]);
            response.Headers.Add("Access-Control-Expose-Headers", "Token,TokenExpiry");
            return response;
        }
    }
}

