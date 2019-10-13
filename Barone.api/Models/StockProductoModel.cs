using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Barone.api.Models
{
    public class StockProductoModel
    {
        [Key]
        public int id { get; set; }
        public ProductoModel Producto { get; set; }
        public CoccionModel Coccion { get; set; }
        public int Cantidad { get; set; }
        public DateTime Fecha { get; set; }

    }
}