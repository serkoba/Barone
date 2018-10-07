using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Barone.api.Models
{
    public class PagoModel
    {
        [Key]
        public long idPago { get; set; }
        public int Tipo { set; get; }
        public DateTime fechaVencimiento { set; get; }
        public DateTime FechaPago { set; get; }
        public int? IdCliente { set; get; }
        public double Importe { set; get; }
        public ClientesModel Cliente { set; get; }

    }
}