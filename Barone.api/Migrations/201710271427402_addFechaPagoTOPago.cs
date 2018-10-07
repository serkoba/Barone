namespace Barone.api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addFechaPagoTOPago : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PagoModels", "FechaPago", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.PagoModels", "FechaPago");
        }
    }
}
