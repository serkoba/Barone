using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Barone.api.Entities
{
    public class AudienceModels
    {

        [MaxLength(100)]
        [Required]
        public string Name { get; set; }
    }
}