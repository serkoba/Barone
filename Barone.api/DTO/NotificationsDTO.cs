using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Barone.api.DTO
{
    public class NotificationsDTO
    {
        public string Message { get; set; }
        public string LinkToDirect { set; get; }
        public int count { get; set; }
    }
}