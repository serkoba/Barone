using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Barone.api.Models
{
    
    public class MovimientosModel
    {
        [Key]
        public long idEntrega { set; get; }
        public DateTime fecha { set; get; }
        public DateTime fechaPactada { set; get; }
        public int IdCliente { set; get; }
        public string DetallePedido { set; get; }
        public string subtotal { set; get; }
        public string TotalLitros { set; get; }
        public string TotalBarriles { set; get; }
        public string bonificacionCliente { set; get; }
        public string TotalImporte { set; get; }
        public string Estado { set; get; }
        public ClientesModel Cliente { set; get; }




    }
}