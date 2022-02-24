using Microsoft.AspNetCore.Http;
using _2122_Senior_Project_06.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System.Data;
using _2122_Senior_Project_06.SqlDatabase;

namespace _2122_Senior_Project_06.Controllers
{
     /*
     * The following controller processes a user logging in
     *  @ AuthenticateUser
     *  @ RetrieveID(maybe on database end?)
     */

    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        /// <summary>
        /// Authenticates the provided user login information.
        /// </summary>
        /// <param name="loginModel">The provided login credentials.</param>
        /// <returns>The account userID, or -1 if login failed.</returns>
        [HttpPost]
        public int AuthenticateUser(string email, string password){
            int userID = -1;
            if(Sys_Security.VerifyPass(password, email))
            {
                userID = UserAccountsDataTable.GetUIDFromEmail(email);
            }  
            return userID;
        }

        //[HttpPost]
        //public int AuthenticateUser([FromBody]LoginPage loginModel){
        //    string possibleUser = Sys_Security.Encoder(loginModel.username);
        //    string possiblePass = Sys_Security.Encoder(loginModel.password);
        //    int userID = -1;
        //    if(Sys_Security.VerifyPass(possiblePass, possibleUser))
        //    {
        //        userID = UserAccountsDataTable.GetUIDFromEmail(loginModel.username);
        //    }  
        //    return userID;
        //}
        //Other possible Functions
        


        /*[HttpPut]
        public IActionResult UpdatePassword(<change password model? loginmodel?>)
        {
            if( (Login_Sec.VerifySQL(NewAccModel.Password) == true)
            {
                return Sys_Security.ErrorMess(0);
            }
            if(Login_Sec.VerifyNewPass(NewAccModel.Password))
                //if password meets requirements
            {
                // store new password
                // return Ok()
            }
            else
                //if password does not meet requirements
            {
                // display an error message to the user saying password does not meet requirements and provide requirements
                // return NotOk()
            }
        }*/
    }
}