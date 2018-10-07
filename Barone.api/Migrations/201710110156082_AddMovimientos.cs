namespace Barone.api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddMovimientos : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.DetallesMovimientosModels", "NroBarril", c => c.String());
            AddColumn("dbo.DetallesMovimientosModels", "Tipo", c => c.String());
            AddColumn("dbo.DetallesMovimientosModels", "Precio", c => c.String());
            AddColumn("dbo.DetallesMovimientosModels", "CantidadLitros", c => c.String());
            AddColumn("dbo.MovimientosModels", "fechaPactada", c => c.DateTime(nullable: false));
            AddColumn("dbo.MovimientosModels", "TotalLitros", c => c.String());
            AddColumn("dbo.MovimientosModels", "TotalBarriles", c => c.String());
            AddColumn("dbo.MovimientosModels", "Estado", c => c.String());
            DropColumn("dbo.DetallesMovimientosModels", "barril");
            DropColumn("dbo.DetallesMovimientosModels", "estilo");
            DropColumn("dbo.DetallesMovimientosModels", "importe");
            DropColumn("dbo.MovimientosModels", "EstadoMovimiento");
        }
        
        public override void Down()
        {
            AddColumn("dbo.MovimientosModels", "EstadoMovimiento", c => c.String());
            AddColumn("dbo.DetallesMovimientosModels", "importe", c => c.String());
            AddColumn("dbo.DetallesMovimientosModels", "estilo", c => c.String());
            AddColumn("dbo.DetallesMovimientosModels", "barril", c => c.String());
            DropColumn("dbo.MovimientosModels", "Estado");
            DropColumn("dbo.MovimientosModels", "TotalBarriles");
            DropColumn("dbo.MovimientosModels", "TotalLitros");
            DropColumn("dbo.MovimientosModels", "fechaPactada");
            DropColumn("dbo.DetallesMovimientosModels", "CantidadLitros");
            DropColumn("dbo.DetallesMovimientosModels", "Precio");
            DropColumn("dbo.DetallesMovimientosModels", "Tipo");
            DropColumn("dbo.DetallesMovimientosModels", "NroBarril");
        }
    }
}
