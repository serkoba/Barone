using Barone.api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Barone.api.DTO
{
    public class MovimientosXEstilos
    {
        public ClientesModel Cliente { get; set; }
        public IEnumerable<GroupByEstilo> Totales { get; set; }

    }
}