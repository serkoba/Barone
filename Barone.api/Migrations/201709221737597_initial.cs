namespace Barone.api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BarrilModels",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        NroBarril = c.String(),
                        idEstado = c.String(),
                        IdEstilo = c.String(),
                        CantidadLitros = c.String(),
                    })
                .PrimaryKey(t => t.id);
            
            CreateTable(
                "dbo.ClientesModels",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Nombre = c.String(),
                        Apellido = c.String(),
                        CUIT = c.String(),
                        DNI = c.String(),
                        domicilio = c.String(),
                        margen = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.DetallesMovimientosModels",
                c => new
                    {
                        id = c.Long(nullable: false, identity: true),
                        idMovimiento = c.Long(nullable: false),
                        idBarril = c.Int(nullable: false),
                        IdEstilo = c.Int(nullable: false),
                        Cantidad = c.Int(nullable: false),
                        MovimientosModel_id = c.Long(),
                    })
                .PrimaryKey(t => t.id)
                .ForeignKey("dbo.MovimientosModels", t => t.MovimientosModel_id)
                .Index(t => t.MovimientosModel_id);
            
            CreateTable(
                "dbo.EstilosModels",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        Nombre = c.String(),
                        precio = c.Double(nullable: false),
                        ingredientes = c.String(),
                    })
                .PrimaryKey(t => t.id);
            
            CreateTable(
                "dbo.MovimientosModels",
                c => new
                    {
                        id = c.Long(nullable: false, identity: true),
                        fecha = c.DateTime(nullable: false),
                        idCliente = c.String(),
                    })
                .PrimaryKey(t => t.id);
            
            CreateTable(
                "dbo.rangosPreciosModels",
                c => new
                    {
                        id = c.Long(nullable: false, identity: true),
                        NombreRango = c.String(),
                        fechaDesde = c.DateTime(nullable: false),
                        fechaHasta = c.DateTime(nullable: false),
                        precio = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.id);
            
            CreateTable(
                "dbo.usuarioModels",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        Usuario = c.String(),
                        Password = c.String(),
                    })
                .PrimaryKey(t => t.id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.DetallesMovimientosModels", "MovimientosModel_id", "dbo.MovimientosModels");
            DropIndex("dbo.DetallesMovimientosModels", new[] { "MovimientosModel_id" });
            DropTable("dbo.usuarioModels");
            DropTable("dbo.rangosPreciosModels");
            DropTable("dbo.MovimientosModels");
            DropTable("dbo.EstilosModels");
            DropTable("dbo.DetallesMovimientosModels");
            DropTable("dbo.ClientesModels");
            DropTable("dbo.BarrilModels");
        }
    }
}
