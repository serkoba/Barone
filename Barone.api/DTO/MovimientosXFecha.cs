using Barone.api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Barone.api.DTO
{
    public class MovimientosXFecha
    {
        public string Fecha { get; set; }
        public List<MovimientoEstado> data { get; set; }
    }
    public class MovimientoEstado {
        public int data { get; set; }
        public string label { get; set; }
    }

}