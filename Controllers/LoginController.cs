using Microsoft.AspNetCore.Http;
using _2122_Senior_Project_06.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
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
        [HttpPost]
        public IActionResult AuthenticateUser([FromBody]LoginPage loginModel ){
            if( (Sys_Security.VerifySQL(loginModel.username) || Sys_Security.VerifySQL(loginModel.password) == true) )
            {
                /* 
                 * Return Error "Information entered is invalid"
                 * if persists under a given user name, look for username and alert
                 */ 
                 
            }
            else if (Sys_Security.VerifyPass(loginModel.password, loginModel.username))
            {
                /*
                 * get userID from database and return it
                 * either create new class for secure communication between database and api
                 * or leave public calls
                 * return ok()
                 */
            }
            
            return Ok();
        }
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