using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Barone.api.Models
{
    public class ProveedoresModel
    {
        public int id { get; set; }
        public string RazonSocial { set; get; }
        public string Direccion { set; get; }
        public string Telefono { get; set; }
        public string Email { set; get; }
    }
}