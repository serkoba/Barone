using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Barone.api.DTO
{
    public class DetalleMovimientos
    {
        public int id { get; set; }
        public int Cantidad { get; set; }
        public string Tipo { get; set; }
        public IList<BarrilesMov> BarrilesEntrega { get; set; }

    }
    public class BarrilesMov
    {
        public int cantidad { get; set; }
        public string nombre { get; set; }
    }
    public class GroupByEstilo
    {
        public string Estilo { get; set; }
        public int CantidadLitros { get; set; }
        public int CantidadBarriles { get; set; }
    }

   
}