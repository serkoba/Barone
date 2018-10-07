namespace Barone.api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EstiloenBarril : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BarrilModels", "Estilo_id", c => c.Int());
            CreateIndex("dbo.BarrilModels", "Estilo_id");
            AddForeignKey("dbo.BarrilModels", "Estilo_id", "dbo.EstilosModels", "id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.BarrilModels", "Estilo_id", "dbo.EstilosModels");
            DropIndex("dbo.BarrilModels", new[] { "Estilo_id" });
            DropColumn("dbo.BarrilModels", "Estilo_id");
        }
    }
}
