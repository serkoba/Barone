using System;

using System.Security.Claims;
using System.Web;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.DataHandler.Encoder;
using System.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace Barone.api.formats
{
    public class CustomJwtFormat : ISecureDataFormat<AuthenticationTicket>
    {

        private readonly string _issuer = string.Empty;

        public CustomJwtFormat(string issuer)
        {
            _issuer = issuer;
        }

        public string Protect(AuthenticationTicket data)
        {
            if (data == null)
            {
                throw new ArgumentNullException("data");
            }

            string audienceId = ConfigurationManager.AppSettings["as:AudienceId"];

            string symmetricKeyAsBase64 = ConfigurationManager.AppSettings["as:AudienceSecret"];

            var keyByteArray = TextEncodings.Base64Url.Decode(symmetricKeyAsBase64);
            var signingKey = new SymmetricSecurityKey(keyByteArray);
            var signingCredentials = new SigningCredentials(
                                                            signingKey,
                                                            SecurityAlgorithms.HmacSha256);

            


            var issued = data.Properties.IssuedUtc;

            var expires = data.Properties.ExpiresUtc;
            

            var token = new JwtSecurityToken(_issuer, audienceId, data.Identity.Claims, issued.Value.UtcDateTime, expires.Value.UtcDateTime, signingCredentials);

            var handler = new JwtSecurityTokenHandler();

            var jwt = handler.WriteToken(token);

            return jwt;
        }

        public AuthenticationTicket Unprotect(string protectedText)
        {
            string audienceId = ConfigurationManager.AppSettings["as:AudienceId"];

            string symmetricKeyAsBase64 = ConfigurationManager.AppSettings["as:AudienceSecret"];

            var TokenHandler = new JwtSecurityTokenHandler();
            if (string.IsNullOrWhiteSpace(protectedText))
            {
                throw new ArgumentNullException("protectedText");
            }
            var token = TokenHandler.ReadToken(protectedText) as JwtSecurityToken;
            if (token == null)
            {
                throw new ArgumentOutOfRangeException("protectedText", "Invalid token.");
            }
            var keyByteArray = TextEncodings.Base64Url.Decode(symmetricKeyAsBase64);
            var signingKey = new SymmetricSecurityKey(keyByteArray);
            var validationParameters = new TokenValidationParameters
            {
                ValidIssuer = _issuer,
                ValidAudiences = new[] { audienceId },
                IssuerSigningKeys = new[] { signingKey }
            };
            SecurityToken validatedToken;
            ClaimsPrincipal claimsPrincipal = TokenHandler.ValidateToken(protectedText, validationParameters, out validatedToken);
            var claimsIdentity = (ClaimsIdentity)claimsPrincipal.Identity;
            // Fill out the authenticationProperties issued and expires times if the equivalent claims are in the JWT
            var authenticationProperties = new AuthenticationProperties();
            DateTime issued = validatedToken.ValidFrom;
            if (issued != DateTime.MinValue)
            {
                authenticationProperties.IssuedUtc = issued.ToUniversalTime();
            }
            DateTime expires = validatedToken.ValidTo;
            if (expires != DateTime.MinValue)
            {
                authenticationProperties.ExpiresUtc = expires.ToUniversalTime();
            }
            return new AuthenticationTicket(claimsIdentity, authenticationProperties);
        }
    }
}