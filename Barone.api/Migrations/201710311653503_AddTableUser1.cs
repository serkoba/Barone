namespace Barone.api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddTableUser1 : DbMigration
    {
        public override void Up()
        {
            DropTable("dbo.usuarioModels");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.usuarioModels",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        Usuario = c.String(),
                        Password = c.String(),
                    })
                .PrimaryKey(t => t.id);
            
        }
    }
}
