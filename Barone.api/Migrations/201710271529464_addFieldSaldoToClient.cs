namespace Barone.api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addFieldSaldoToClient : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ClientesModels", "SaldoCuenta", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ClientesModels", "SaldoCuenta");
        }
    }
}
