namespace Barone.api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EstiloenBarril4 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.BarrilModels", "IdEstilo", "dbo.EstilosModels");
            DropIndex("dbo.BarrilModels", new[] { "IdEstilo" });
            DropPrimaryKey("dbo.ClientesModels");
            DropPrimaryKey("dbo.MovimientosModels");
            DropPrimaryKey("dbo.rangosPreciosModels");
            DropColumn("dbo.EstilosModels", "precio");
            DropColumn("dbo.ClientesModels", "Id");
            DropColumn("dbo.MovimientosModels", "id");
            DropColumn("dbo.rangosPreciosModels", "id");
            AddColumn("dbo.EstilosModels", "idRango", c => c.Long(nullable: false));
            AddColumn("dbo.ClientesModels", "IdCliente", c => c.Int(nullable: false, identity: true));
            AddColumn("dbo.MovimientosModels", "idEntrega", c => c.Long(nullable: false, identity: true));
            AddColumn("dbo.rangosPreciosModels", "idRango", c => c.Long(nullable: false, identity: true));
            AlterColumn("dbo.BarrilModels", "IdEstilo", c => c.Int());
            AlterColumn("dbo.BarrilModels", "idEntrega", c => c.Long());
            AlterColumn("dbo.MovimientosModels", "IdCliente", c => c.Int());
            AlterColumn("dbo.PedidoModels", "IdCliente", c => c.Int(nullable: false));
            AlterColumn("dbo.PedidoModels", "idEntrega", c => c.Long(nullable: false));
            AddPrimaryKey("dbo.ClientesModels", "IdCliente");
            AddPrimaryKey("dbo.MovimientosModels", "idEntrega");
            AddPrimaryKey("dbo.rangosPreciosModels", "idRango");
            CreateIndex("dbo.BarrilModels", "IdEstilo");
            CreateIndex("dbo.BarrilModels", "idEntrega");
            CreateIndex("dbo.MovimientosModels", "IdCliente");
            CreateIndex("dbo.EstilosModels", "idRango");
            CreateIndex("dbo.PedidoModels", "IdCliente");
            CreateIndex("dbo.PedidoModels", "idEntrega");
            AddForeignKey("dbo.MovimientosModels", "IdCliente", "dbo.ClientesModels", "IdCliente");
            AddForeignKey("dbo.BarrilModels", "idEntrega", "dbo.MovimientosModels", "idEntrega");
            AddForeignKey("dbo.EstilosModels", "idRango", "dbo.rangosPreciosModels", "idRango", cascadeDelete: true);
            AddForeignKey("dbo.PedidoModels", "IdCliente", "dbo.ClientesModels", "IdCliente", cascadeDelete: true);
            AddForeignKey("dbo.PedidoModels", "idEntrega", "dbo.MovimientosModels", "idEntrega", cascadeDelete: true);
            AddForeignKey("dbo.BarrilModels", "IdEstilo", "dbo.EstilosModels", "IdEstilo");
          
        }
        
        public override void Down()
        {
            AddColumn("dbo.rangosPreciosModels", "id", c => c.Long(nullable: false, identity: true));
            AddColumn("dbo.MovimientosModels", "id", c => c.Long(nullable: false, identity: true));
            AddColumn("dbo.ClientesModels", "Id", c => c.Int(nullable: false, identity: true));
            AddColumn("dbo.EstilosModels", "precio", c => c.Double(nullable: false));
            DropForeignKey("dbo.BarrilModels", "IdEstilo", "dbo.EstilosModels");
            DropForeignKey("dbo.PedidoModels", "idEntrega", "dbo.MovimientosModels");
            DropForeignKey("dbo.PedidoModels", "IdCliente", "dbo.ClientesModels");
            DropForeignKey("dbo.EstilosModels", "idRango", "dbo.rangosPreciosModels");
            DropForeignKey("dbo.BarrilModels", "idEntrega", "dbo.MovimientosModels");
            DropForeignKey("dbo.MovimientosModels", "IdCliente", "dbo.ClientesModels");
            DropIndex("dbo.PedidoModels", new[] { "idEntrega" });
            DropIndex("dbo.PedidoModels", new[] { "IdCliente" });
            DropIndex("dbo.EstilosModels", new[] { "idRango" });
            DropIndex("dbo.MovimientosModels", new[] { "IdCliente" });
            DropIndex("dbo.BarrilModels", new[] { "idEntrega" });
            DropIndex("dbo.BarrilModels", new[] { "IdEstilo" });
            DropPrimaryKey("dbo.rangosPreciosModels");
            DropPrimaryKey("dbo.MovimientosModels");
            DropPrimaryKey("dbo.ClientesModels");
            AlterColumn("dbo.PedidoModels", "idEntrega", c => c.String());
            AlterColumn("dbo.PedidoModels", "IdCliente", c => c.String());
            AlterColumn("dbo.MovimientosModels", "IdCliente", c => c.String());
            AlterColumn("dbo.BarrilModels", "idEntrega", c => c.String());
            AlterColumn("dbo.BarrilModels", "IdEstilo", c => c.Int(nullable: false));
            DropColumn("dbo.rangosPreciosModels", "idRango");
            DropColumn("dbo.MovimientosModels", "idEntrega");
            DropColumn("dbo.ClientesModels", "IdCliente");
            DropColumn("dbo.EstilosModels", "idRango");
            AddPrimaryKey("dbo.rangosPreciosModels", "id");
            AddPrimaryKey("dbo.MovimientosModels", "id");
            AddPrimaryKey("dbo.ClientesModels", "Id");
            CreateIndex("dbo.BarrilModels", "IdEstilo");
            AddForeignKey("dbo.BarrilModels", "IdEstilo", "dbo.EstilosModels", "IdEstilo", cascadeDelete: true);
        }
    }
}
