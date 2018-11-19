using Barone.api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Barone.api.DTO
{
    public class ReportFilterViewModel
    {
        public string NroBarril { get; set; }
        public string RazonSocial { get; set; }
        public DateTime FechaDesde { get; set; }
        public DateTime FechaHasta { get; set; }
        public int? Estado { set; get; }
        public int? Estilo { get; set; }
    }
}