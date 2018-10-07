namespace Barone.api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EstiloenBarril2 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.BarrilModels", "Estilo_id", "dbo.EstilosModels");
            DropIndex("dbo.BarrilModels", new[] { "Estilo_id" });
            DropColumn("dbo.BarrilModels", "IdEstilo");
            DropPrimaryKey("dbo.EstilosModels");
            DropColumn("dbo.EstilosModels", "id");
            RenameColumn(table: "dbo.BarrilModels", name: "Estilo_id", newName: "IdEstilo");
            
            AddColumn("dbo.EstilosModels", "IdEstilo", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.BarrilModels", "IdEstilo", c => c.Int(nullable: false));
            AlterColumn("dbo.BarrilModels", "IdEstilo", c => c.Int(nullable: false));
            AddPrimaryKey("dbo.EstilosModels", "IdEstilo");
            CreateIndex("dbo.BarrilModels", "IdEstilo");
            AddForeignKey("dbo.BarrilModels", "IdEstilo", "dbo.EstilosModels", "IdEstilo", cascadeDelete: true);

        }
        
        public override void Down()
        {
            AddColumn("dbo.EstilosModels", "id", c => c.Int(nullable: false, identity: true));
            DropForeignKey("dbo.BarrilModels", "IdEstilo", "dbo.EstilosModels");
            DropIndex("dbo.BarrilModels", new[] { "IdEstilo" });
            DropPrimaryKey("dbo.EstilosModels");
            AlterColumn("dbo.BarrilModels", "IdEstilo", c => c.Int());
            AlterColumn("dbo.BarrilModels", "IdEstilo", c => c.String());
            DropColumn("dbo.EstilosModels", "IdEstilo");
            AddPrimaryKey("dbo.EstilosModels", "id");
            RenameColumn(table: "dbo.BarrilModels", name: "IdEstilo", newName: "Estilo_id");
            AddColumn("dbo.BarrilModels", "IdEstilo", c => c.String());
            CreateIndex("dbo.BarrilModels", "Estilo_id");
            AddForeignKey("dbo.BarrilModels", "Estilo_id", "dbo.EstilosModels", "id");
        }
    }
}
