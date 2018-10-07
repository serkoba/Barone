namespace Barone.api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddTableUser5 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.UserModels",
                c => new
                    {
                        idUser = c.Long(nullable: false, identity: true),
                        userProfile = c.String(),
                        Role = c.String(),
                    })
                .PrimaryKey(t => t.idUser);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.UserModels");
        }
    }
}
