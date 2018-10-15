using Barone.api.DTO;

using Barone.api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Barone.api.Controllers
{
    [Authorize]
    public class NotificationsController : ApiController
    {
        private BaroneapiContext db = new BaroneapiContext();

        [Route("api/Notificaciones")]
        public IEnumerable<NotificationsDTO> GetBarrilModelsAgrupados()
        {
            int[] EstadoPosible ={ 1,2};
            IList<NotificationsDTO> newList = new List<NotificationsDTO>();
            NotificationsDTO item = null;
            var FechaLimite = DateTime.Now.AddDays(2);
            /////Traer Pedidos demorados
            var result = (from b in db.PedidoModels
                          where (b.fechaPactada <= FechaLimite) && (EstadoPosible.Equals(b.Estado))
                          select b);
            if (result.Count() > 0) { 
            item = new NotificationsDTO() { Message = String.Format("Hay {0} Pedidos a Punto de Vencer",result.Count()), LinkToDirect = "Pedido", count = result.Count() };
            newList.Add(item);
            }

            ///check if there are barriles without comeback
            ///
            var resultBarriles = (from b in db.BarrilModels
                                  join x in db.MovimientosModels on b.idEntrega.Value equals x.idEntrega
                          where (x.fechaPactada >= FechaLimite) && (EstadoPosible.Equals(x.Estado))
                          select b);

            if (resultBarriles.Count() > 0)
            {
                item = new NotificationsDTO() { Message = String.Format("Hay {0} Barriles que no han sido devueltos",resultBarriles.Count()), LinkToDirect = "Barriles", count = resultBarriles.Count() };
                newList.Add(item);
            }



            return newList;

        }
    }
}
