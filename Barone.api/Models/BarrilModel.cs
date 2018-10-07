using System;
using System.Collections.Generic;
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


    }
}