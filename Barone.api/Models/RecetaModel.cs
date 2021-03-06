﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Barone.api.Models
{
    public class RecetaModel
    {
        [Key]
        public int id { get; set; }
        public DateTime Fecha { get; set; }
        public string Nombre { get; set; }
        public string SRM { get; set; }
        public string IBU { get; set; }
        public string ABV { get; set; }
        public string OG { get; set; }
        public string TiempoEmpaste { get; set; }
        public decimal Litros { get; set; }
        public decimal PH { get; set; }
        public string  Sparge { get; set; }
        public string Observaciones { get; set; }
        public string Malta { get; set; }
        public string Lupulo { get; set; }
        public string Agua { get; set; }
        public string Adjunto { get; set; }
        public int LitrosTotales { get; set; }
        public EstilosModel Estilo { get; set; }



    }
}