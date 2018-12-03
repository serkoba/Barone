﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Barone.api.Models
{
    public class CoccionModel
    {
        public int id { get; set; }
        public RecetaModel Receta { get; set; }
        public DateTime Fecha { get; set; }
        public DateTime FechaFin { get; set; }
        public string NroLote { get; set; }
        public int Multiplicador { get; set; }
        public int Estado { get; set; }
        public FermentadorModel Fermentador { get; set; }
        public string MedicionesMash { get; set; }
        public string Hervor { get; set; }
        public string Fermentacion { get; set; }
        public string Carbonatacion { get; set; }


    }
}