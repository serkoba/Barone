using Barone.api.Models;
using Barone.api.Services;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http.Cors;

namespace Barone.api.providers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class SimpleAuthorizationServerProvider: OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated(); //   
        }
        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
 
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        
    }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

            using (var db = new BaroneapiContext())
            {
                if (db != null)
                {
                    var user = new UserServices();
                    if (user != null)
                    {
                        var userExist = user.Authenticate(context.UserName, context.Password);
                        if (!(userExist ==null))
                        {
                            identity.AddClaim(new Claim("role", userExist.Role));
                            identity.AddClaim(new Claim("userdisplayname", context.UserName));
                           // var props = new AuthenticationProperties(new Dictionary<string, string>());
                            var props = new AuthenticationProperties(new Dictionary<string, string>
                            {
                                {
                                    "userdisplayname", context.UserName
                                },
                                {
                                     "role", userExist.Role
                                },
                                {
                                    "success", "true"
                                }
                             });

                            var ticket = new AuthenticationTicket(identity, props);
                            context.Validated(ticket);
                        }
                        else
                        {
                            context.SetError("invalid_grant", "Provided username and password is incorrect");
                            context.Rejected();
                        }
                    }
                }
                else
                {
                    context.SetError("invalid_grant", "Provided username and password is incorrect");
                    context.Rejected();
                }
                return;
            }
        }
    }
}
