using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Barone.api.Models
{
    public class ClientesModel
    {
        [Key]
        public int IdCliente { get; set; }
        public string RazonSocial { get; set; }
        public string CUIT { set; get; }
        public string DNI { set; get; }
        public string domicilio { get; set; }
        public double margen { get; set; }
        public double SaldoCuenta { set; get; }
        public string description { get; set; }
        public string ciudad { get; set; }
        public string provincia { get; set; }
        public string pais { get; set; }
        public string Telefono { get; set; }

    }
}