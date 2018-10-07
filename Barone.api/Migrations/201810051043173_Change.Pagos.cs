namespace Barone.api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangePagos : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.PagoModels", "Tipo", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.PagoModels", "Tipo", c => c.String());
        }
    }
}
