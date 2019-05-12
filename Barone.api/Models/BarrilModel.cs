using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Barone.api.Models
{
    public class BarrilModel
    {
        public int id { get; set; }
        public string NroBarril { set; get; }
        public int idEstado { set; get; }
        public int? IdEstilo { get; set; }
        public string CantidadLitros { set; get; }
        public long? idEntrega { set; get; }
        public EstilosModel Estilo { get; set; }
        public MovimientosModel Entrega { set; get; }
        public CoccionModel Coccion { get; set; }
        [NotMapped]
        public long? Coccion_id { set; get; }


    }
}