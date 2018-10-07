using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Barone.api
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            /////Esta es para setear todos los controllers con Seguridad.
        //   GlobalConfiguration.Configuration.Filters.Add(new ApiAuthenticationFilter());
            // Web API configuration and services
            var enableCorsAttribute = new EnableCorsAttribute("*",
                                               "Origin, Content-Type, Accept, Authorization, Token",
                                               "GET, PUT, POST, DELETE, OPTIONS, PATCH");
            config.EnableCors(enableCorsAttribute);

            // var jsonFormatter = config.Formatters.OfType<JsonMediaTypeFormatter>().First();
            //jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            // Web API routes
            config.MapHttpAttributeRoutes();
          
            //INstall Odata

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

           


        }
    }
}
