using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Barone.api.Models
{
    public class rangosPreciosModel
    {
        [Key]
        public long idRango { set; get; }
        public string NombreRango { set; get; }
        public DateTime fechaDesde { set; get; }
        public DateTime fechaHasta { set; get; }
        public double precio { set; get; }

    }
}