using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Barone.api.Models
{
    public class PedidoModel
    {
        public long id { set; get; }
        public int IdCliente { set; get; }
        public DateTime fechaPedido { set; get; }
        public DateTime fechaPactada { set; get; }
        public string DetallePedido { set; get; }
        public string TotalBarriles { set; get; }
        public string Estado { set; get; }
        public long? idEntrega { set; get; }
        public ClientesModel Cliente { set; get; }
        public MovimientosModel Entrega { set; get; }
    }
}