namespace Barone.api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addTableToken : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Tokens",
                c => new
                    {
                        TokenId = c.Int(nullable: false, identity: true),
                        idUser = c.Int(nullable: false),
                        AuthToken = c.String(),
                        IssuedOn = c.DateTime(nullable: false),
                        ExpiresOn = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.TokenId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Tokens");
        }
    }
}
