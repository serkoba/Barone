using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Barone.api.Models
{
    public class InsumoModel
    {
        public int id { get; set; }
        public string Nombre { get; set; }
        public int TipoUnidadMedida { get; set; }
        public int Stock { get; set; }


    }
}