namespace Barone.api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DetalleToString : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.DetallesMovimientosModels", "MovimientosModel_id", "dbo.MovimientosModels");
            DropIndex("dbo.DetallesMovimientosModels", new[] { "MovimientosModel_id" });
            AddColumn("dbo.MovimientosModels", "DetallePedido", c => c.String());
            DropColumn("dbo.DetallesMovimientosModels", "MovimientosModel_id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.DetallesMovimientosModels", "MovimientosModel_id", c => c.Long());
            DropColumn("dbo.MovimientosModels", "DetallePedido");
            CreateIndex("dbo.DetallesMovimientosModels", "MovimientosModel_id");
            AddForeignKey("dbo.DetallesMovimientosModels", "MovimientosModel_id", "dbo.MovimientosModels", "id");
        }
    }
}
