namespace Barone.api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addcolumnEstadoDelivery : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.MovimientosModels", "EstadoDelivery", c => c.Int(nullable: false));
            AlterColumn("dbo.MovimientosModels", "Estado", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.MovimientosModels", "Estado", c => c.String());
            DropColumn("dbo.MovimientosModels", "EstadoDelivery");
        }
    }
}
