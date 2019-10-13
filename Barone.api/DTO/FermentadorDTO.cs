using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Barone.api.DTO
{
    public class FermentadorDTO
    {
        public int id { get; set; }
        public string Identificador { set; get; }
        public int Capacidad { set; get; }
        public string coccion { get; set; }
    }
}