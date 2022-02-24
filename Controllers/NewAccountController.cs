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
        [HttpPost]
        public void GenerateUsers()
        {
            NewAccPage sarah = new NewAccPage{UserID = 2, Username="Sarah", Password=Sys_Security.SHA256_Hash("G00lsby"), Email="email1@gmail.com"};
            NewAccPage hugo = new NewAccPage{UserID = 1, Username="Hugo", Password=Sys_Security.SHA256_Hash("M@zariego"), Email="email2@gmail.com"};
            NewAccPage andrew = new NewAccPage{UserID = 3, Username="Andrew", Password=Sys_Security.SHA256_Hash("Bev!lacqua"), Email="email3@gmail.com"};
            NewAccPage ulysses = new NewAccPage{UserID = 4, Username="Ulysses", Password=Sys_Security.SHA256_Hash("Riv&ra"), Email="email4@gmail.com"};
            NewAccPage dani = new NewAccPage{UserID = 5, Username="Hugo", Password=Sys_Security.SHA256_Hash("Mar+inez"), Email="email5@gmail.com"};
            UserAccountsDataTable.AddNewAccount(sarah);
            UserAccountsDataTable.AddNewAccount(hugo);
            UserAccountsDataTable.AddNewAccount(andrew);
            UserAccountsDataTable.AddNewAccount(ulysses);
            UserAccountsDataTable.AddNewAccount(dani);
        }
        /*
         * The following controller processes a new account being created
         *  @ CreateNewUser
         */
        [HttpPost]
        public IActionResult CreateNewUser([FromBody]NewAccPage UserModel)
        {
            if(Sys_Security.VerifyNewPass(UserModel.Password))
            {
                string Enc_Uname = Sys_Security.Encoder(UserModel.Username);
                string Enc_Pword = Sys_Security.SHA256_Hash(Sys_Security.Encoder(UserModel.Password));
                string Enc_Email = Sys_Security.Encoder(UserModel.Email);
                int UID = Sys_Security.GenUID(UserModel.UserID);
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