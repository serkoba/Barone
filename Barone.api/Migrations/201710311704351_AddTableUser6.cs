namespace Barone.api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddTableUser6 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.UserModels", "pass", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.UserModels", "pass");
        }
    }
}
