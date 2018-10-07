using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Barone.api.Models
{
    public class Token
    {
        [Key]
        public int TokenId { set; get; }
        public long idUser { set; get; }
        public string AuthToken { set; get; }
        public DateTime IssuedOn { set; get; }
        public DateTime ExpiresOn { set; get; }

    }
}