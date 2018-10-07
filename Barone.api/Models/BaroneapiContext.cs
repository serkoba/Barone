using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Barone.api.Models
{
    public class BaroneapiContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public BaroneapiContext() : base("name=BaroneapiContext")
        {
        }

        public System.Data.Entity.DbSet<Barone.api.Models.ClientesModel> ClientesModels { get; set; }

        public System.Data.Entity.DbSet<Barone.api.Models.BarrilModel> BarrilModels { get; set; }

        public System.Data.Entity.DbSet<Barone.api.Models.DetallesMovimientosModel> DetallesMovimientosModels { get; set; }

        public System.Data.Entity.DbSet<Barone.api.Models.EstilosModel> EstilosModels { get; set; }

        public System.Data.Entity.DbSet<Barone.api.Models.MovimientosModel> MovimientosModels { get; set; }

        public System.Data.Entity.DbSet<Barone.api.Models.rangosPreciosModel> rangosPreciosModels { get; set; }

        

        public System.Data.Entity.DbSet<Barone.api.Models.PedidoModel> PedidoModels { get; set; }

        public System.Data.Entity.DbSet<Barone.api.Models.PagoModel> PagoModels { get; set; }

        public System.Data.Entity.DbSet<Barone.api.Models.UserModel> UserModels { get; set; }
        public System.Data.Entity.DbSet<Barone.api.Models.Token> TokenModels { get; set; }
        public System.Data.Entity.DbSet<Barone.api.Models.Audience> Audience { get; set; }
    }
}
