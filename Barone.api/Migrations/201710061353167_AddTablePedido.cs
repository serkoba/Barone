namespace Barone.api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddTablePedido : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.PedidoModels",
                c => new
                    {
                        id = c.Long(nullable: false, identity: true),
                        IdCliente = c.String(),
                        fechaPedido = c.DateTime(nullable: false),
                        fechaPactada = c.DateTime(nullable: false),
                        DetallePedido = c.String(),
                        TotalBarriles = c.String(),
                        Estado = c.String(),
                    })
                .PrimaryKey(t => t.id);
            
            AddColumn("dbo.DetallesMovimientosModels", "barril", c => c.String());
            AddColumn("dbo.DetallesMovimientosModels", "estilo", c => c.String());
            AddColumn("dbo.DetallesMovimientosModels", "importe", c => c.String());
            AddColumn("dbo.MovimientosModels", "subtotal", c => c.String());
            AddColumn("dbo.MovimientosModels", "bonificacionCliente", c => c.String());
            AddColumn("dbo.MovimientosModels", "TotalImporte", c => c.String());
            AddColumn("dbo.MovimientosModels", "EstadoMovimiento", c => c.String());
            DropColumn("dbo.DetallesMovimientosModels", "idBarril");
            DropColumn("dbo.DetallesMovimientosModels", "IdEstilo");
            DropColumn("dbo.DetallesMovimientosModels", "Cantidad");
        }
        
        public override void Down()
        {
            AddColumn("dbo.DetallesMovimientosModels", "Cantidad", c => c.Int(nullable: false));
            AddColumn("dbo.DetallesMovimientosModels", "IdEstilo", c => c.Int(nullable: false));
            AddColumn("dbo.DetallesMovimientosModels", "idBarril", c => c.Int(nullable: false));
            DropColumn("dbo.MovimientosModels", "EstadoMovimiento");
            DropColumn("dbo.MovimientosModels", "TotalImporte");
            DropColumn("dbo.MovimientosModels", "bonificacionCliente");
            DropColumn("dbo.MovimientosModels", "subtotal");
            DropColumn("dbo.DetallesMovimientosModels", "importe");
            DropColumn("dbo.DetallesMovimientosModels", "estilo");
            DropColumn("dbo.DetallesMovimientosModels", "barril");
            DropTable("dbo.PedidoModels");
        }
    }
}
