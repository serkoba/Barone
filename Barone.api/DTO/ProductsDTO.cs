using Barone.api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Barone.api.DTO
{
    public class ProductsDTO
    {
        public int id { get; set; }
        public string Nombre { set; get; }
        public int Stock { set; get; }
        public decimal Litros { set; get; }
       // public  StockProductoModel StockProductos { get; set; }
       public double Precio { set; get; }
    }
}