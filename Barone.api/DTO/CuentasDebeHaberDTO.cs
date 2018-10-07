using Barone.api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Barone.api.DTO
{
    public class CuentasDebeHaberDTO
    {
        public string Descripcion { set; get; }
        public DateTime Fecha { set; get; }
        public double DebeImporte { set; get; }
        public double HaberImporte { set; get; }
        public int? IdCliente { set; get; }
        public ClientesModel Cliente { set; get; }

    }
}