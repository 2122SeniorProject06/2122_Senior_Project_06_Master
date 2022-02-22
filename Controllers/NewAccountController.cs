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
            if( (Sys_Security.VerifySQL(UserModel.username) || Sys_Security.VerifySQL(UserModel.password)) ) //|| Sys_Security.VerifyEmail(UserModel.email) ) )
            {
                /* 
                 * return error message "Information entered is invalid"
                 */
                return NotFound();               
            }
            if(Sys_Security.VerifyNewPass(UserModel.password))
            {
                // string mainTable = "UserHome";
                // DatabaseAccess.CreateTable(mainTable, "user_ID int, username varchar(256), password varchar(64), email varchar(256)");
                // DatabaseAccess.AddEntryToTable(mainTable, Sys_Security.GenUID(UserModel.user_ID), UserModel.username, UserModel.password, UserModel.email);
                /*
                 * store new username and password
                 * generate, save and send a new UserID
                 * return Ok() and UserID
                 */
            }
            else
            {
                /* 
                   Return error message "Password does not meet password requirements.
                   Include password policy:
                        - Minimum of 8 character
                        - One upper case letter
                        - One lower case letter
                        - One number
                */
            }
            return Ok();
        }
    }
}