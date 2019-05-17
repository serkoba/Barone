using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Barone.api.Extension
{
    public static class intExtension
    {
        public static int ToNullableInt(this string s)
        {
            int i;
            if (int.TryParse(s, out i)) return i;
            return 0;
        }
    }
}