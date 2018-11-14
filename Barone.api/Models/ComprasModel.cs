using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Barone.api.Models
{
    public class ComprasModel
    {
        public int id { get; set; }
        public decimal Cantidad { get; set; }
        public decimal Precio { get; set; }
        public DateTime FechaCompra { get; set; }
        public virtual InsumoModel Insumo { get; set; }
        public virtual ProveedoresModel Proveedor { get; set; }

    }
}