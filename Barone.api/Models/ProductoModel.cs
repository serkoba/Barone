using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Barone.api.Models
{
    public class ProductoModel
    {
        [Key]
        public int id { get; set; }
        public string Nombre { set; get; }
        public int Stock { set; get; }
        public decimal Litros { set; get; }
    }
}