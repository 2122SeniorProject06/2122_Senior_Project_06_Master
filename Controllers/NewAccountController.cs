using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using _2122_Senior_Project_06.Models;
using _2122_Senior_Project_06.SqlDatabase;

namespace _2122_Senior_Project_06.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NewAccountController : ControllerBase
    {
        /*
         * The following controller processes a new account being created
         *  @ CreateNewUser
         */
        [HttpPost]
        public IActionResult CreateNewUser([FromBody]NewAccPage UserModel)
        {
            if(Sys_Security.VerifyNewPass(UserModel.password))
            {
                string Enc_Uname = Sys_Security.Encoder(UserModel.username);
                string Enc_Pword = Sys_Security.SHA256_Hash(Sys_Security.Encoder(UserModel.password));
                string Enc_Email = Sys_Security.Encoder(UserModel.email);
                int UID = Sys_Security.GenUID(UserModel.user_ID);
                return Ok();
                // DatabaseAccess.AddEntryToTable("UserAccounts", UID, Enc_Uname, Enc_Pword, Enc_Email);
                /*
                 * store new username and password
                 * generate, save and send a new UserID
                 * return Ok() and UserID
                 */
            }
            else
            {
                return NotFound();
                /* 
                   Return error message "Password does not meet password requirements.
                   Include password policy:
                        - Minimum of 8 character
                        - One upper case letter
                        - One lower case letter
                        - One number
                */
            }
        }
    }
}