namespace Barone.api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangeRazonSocial : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ClientesModels", "RazonSocial", c => c.String());
            DropColumn("dbo.ClientesModels", "Nombre");
            DropColumn("dbo.ClientesModels", "Apellido");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ClientesModels", "Apellido", c => c.String());
            AddColumn("dbo.ClientesModels", "Nombre", c => c.String());
            DropColumn("dbo.ClientesModels", "RazonSocial");
        }
    }
}
