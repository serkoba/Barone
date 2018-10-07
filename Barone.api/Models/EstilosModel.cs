using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Barone.api.Models
{
    public class EstilosModel
    {
        [Key]
        public int IdEstilo { set; get; }
        public string Nombre { set; get; }
        public long idRango { set; get; }
        public string ingredientes { set; get; }
        public rangosPreciosModel rangoPrecio { set; get; }
        
    }
}