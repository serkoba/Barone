using Barone.api.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Barone.api.Services
{
    public class TokenServices
    {
        
        private BaroneapiContext db = new BaroneapiContext();
        public Token GenerateToken(long userId)
        {
            
            string token = Guid.NewGuid().ToString();
            DateTime issuedOn = DateTime.Now;
            DateTime expiredOn = DateTime.Now.AddSeconds(
                                  Convert.ToDouble(ConfigurationManager.AppSettings["AuthTokenExpiry"]));
            var tokendomain = new Token
            {
                idUser = userId,
                AuthToken = token,
                IssuedOn = issuedOn,
                ExpiresOn = expiredOn
            };
            db.TokenModels.Add(tokendomain);
            db.SaveChanges();

            //
            var tokenModel = new Token()
            {
                idUser = userId,
                IssuedOn = issuedOn,
                ExpiresOn = expiredOn,
                AuthToken = token
            };

            return tokenModel;
        }
        public bool ValidateToken(string tokenId)
        {
            var token = db.TokenModels.Where(t => t.AuthToken == tokenId && t.ExpiresOn > DateTime.Now).FirstOrDefault();
            if (token != null && !(DateTime.Now > token.ExpiresOn))
            {
                token.ExpiresOn = token.ExpiresOn.AddSeconds(
                                              Convert.ToDouble(ConfigurationManager.AppSettings["AuthTokenExpiry"]));
                db.Entry(token).State = EntityState.Modified;
                db.SaveChanges();
                return true;
            }
            return false;
        }
        public bool Kill(string tokenId)
        {
            Token token = db.TokenModels.Where(x => x.AuthToken == tokenId).FirstOrDefault();
           

            db.TokenModels.Remove(token);
            db.SaveChanges();
            var isNotDeleted = db.TokenModels.Where(x => x.AuthToken == tokenId).Any();
            if (isNotDeleted) { return false; }
            return true;
        }
        public bool DeleteByUserId(int userId)
        {
            Token token = db.TokenModels.Where(x => x.idUser == userId).FirstOrDefault();
            db.TokenModels.Remove(token);
            db.SaveChanges();

            var isNotDeleted = db.TokenModels.Where(x => x.idUser == userId).Any();
            return !isNotDeleted;
        }
      
    }
}