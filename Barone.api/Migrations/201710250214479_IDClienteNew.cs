namespace Barone.api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class IDClienteNew : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.MovimientosModels", "IdCliente", "dbo.ClientesModels");
            DropForeignKey("dbo.PedidoModels", "idEntrega", "dbo.MovimientosModels");
            DropIndex("dbo.MovimientosModels", new[] { "IdCliente" });
            DropIndex("dbo.PedidoModels", new[] { "idEntrega" });
            AlterColumn("dbo.MovimientosModels", "IdCliente", c => c.Int(nullable: false));
            AlterColumn("dbo.PedidoModels", "idEntrega", c => c.Long());
            CreateIndex("dbo.MovimientosModels", "IdCliente");
            CreateIndex("dbo.PedidoModels", "idEntrega");
            AddForeignKey("dbo.MovimientosModels", "IdCliente", "dbo.ClientesModels", "IdCliente", cascadeDelete: true);
            AddForeignKey("dbo.PedidoModels", "idEntrega", "dbo.MovimientosModels", "idEntrega");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.PedidoModels", "idEntrega", "dbo.MovimientosModels");
            DropForeignKey("dbo.MovimientosModels", "IdCliente", "dbo.ClientesModels");
            DropIndex("dbo.PedidoModels", new[] { "idEntrega" });
            DropIndex("dbo.MovimientosModels", new[] { "IdCliente" });
            AlterColumn("dbo.PedidoModels", "idEntrega", c => c.Long(nullable: false));
            AlterColumn("dbo.MovimientosModels", "IdCliente", c => c.Int());
            CreateIndex("dbo.PedidoModels", "idEntrega");
            CreateIndex("dbo.MovimientosModels", "IdCliente");
            AddForeignKey("dbo.PedidoModels", "idEntrega", "dbo.MovimientosModels", "idEntrega", cascadeDelete: true);
            AddForeignKey("dbo.MovimientosModels", "IdCliente", "dbo.ClientesModels", "IdCliente");
        }
    }
}
