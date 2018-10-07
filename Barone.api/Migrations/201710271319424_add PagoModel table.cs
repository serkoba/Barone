namespace Barone.api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addPagoModeltable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.PagoModels",
                c => new
                    {
                        idPago = c.Long(nullable: false, identity: true),
                        Tipo = c.String(),
                        fechaVencimiento = c.DateTime(nullable: false),
                        IdCliente = c.Int(),
                        Importe = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.idPago);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.PagoModels");
        }
    }
}
