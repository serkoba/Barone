using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Barone.api.Models
{
    [Serializable]
    public class DetallesMovimientosModel
    {
        
        public long id { set; get; }
        public long idMovimiento { set; get; }
        public string NroBarril { set; get; }
        public string Tipo { set; get; }
        public string Precio { set; get; }
        public string CantidadLitros { set; get; }


    }
}