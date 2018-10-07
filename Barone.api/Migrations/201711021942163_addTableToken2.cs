namespace Barone.api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addTableToken2 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Tokens", "idUser", c => c.Long(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Tokens", "idUser", c => c.Int(nullable: false));
        }
    }
}
