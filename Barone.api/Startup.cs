using Barone.api.formats;
using Barone.api.providers;
using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System;
using System.Web.Http;

[assembly: OwinStartup(typeof(Barone.api.Startup))]
namespace Barone.api
{
    public class Startup
    {
        public void ConfigureAuth(IAppBuilder app)
        {

            var OAuthOptions = new OAuthAuthorizationServerOptions
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/api/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromHours(2),
                Provider = new SimpleAuthorizationServerProvider(),
             //   AccessTokenFormat = new CustomJwtFormat("http://localhost:56770")
            };

            app.UseOAuthBearerTokens(OAuthOptions);
           // app.UseOAuthAuthorizationServer(OAuthOptions);
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions() {
            });

            HttpConfiguration config = new HttpConfiguration();
            WebApiConfig.Register(config);
        }

        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}