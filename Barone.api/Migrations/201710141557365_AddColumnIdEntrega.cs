namespace Barone.api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddColumnIdEntrega : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PedidoModels", "idEntrega", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.PedidoModels", "idEntrega");
        }
    }
}
