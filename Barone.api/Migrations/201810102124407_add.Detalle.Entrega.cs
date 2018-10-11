namespace Barone.api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addDetalleEntrega : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.MovimientosModels", "DetalleEntrega", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.MovimientosModels", "DetalleEntrega");
        }
    }
}
