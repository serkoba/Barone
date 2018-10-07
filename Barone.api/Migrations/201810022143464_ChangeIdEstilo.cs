namespace Barone.api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeIdEstilo : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.BarrilModels", "idEstado", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.BarrilModels", "idEstado", c => c.String());
        }
    }
}
