namespace Barone.api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddColumn_idEntrega : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BarrilModels", "idEntrega", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.BarrilModels", "idEntrega");
        }
    }
}
