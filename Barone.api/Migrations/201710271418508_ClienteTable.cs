namespace Barone.api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ClienteTable : DbMigration
    {
        public override void Up()
        {
            CreateIndex("dbo.PagoModels", "IdCliente");
            AddForeignKey("dbo.PagoModels", "IdCliente", "dbo.ClientesModels", "IdCliente");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.PagoModels", "IdCliente", "dbo.ClientesModels");
            DropIndex("dbo.PagoModels", new[] { "IdCliente" });
        }
    }
}
