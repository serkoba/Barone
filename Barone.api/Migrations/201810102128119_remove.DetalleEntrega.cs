namespace Barone.api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class removeDetalleEntrega : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.MovimientosModels", "DetalleEntrega");
        }
        
        public override void Down()
        {
            AddColumn("dbo.MovimientosModels", "DetalleEntrega", c => c.String());
        }
    }
}
