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
        [HttpPost("SuperSecretBaseValueGeneration")]
        public void GenerateUsers()
        {
            UserAccount sarah = new UserAccount { UserID = 2, Username="Sarah", Password= Sys_Security.SHA256_Hash("G00lsby"), Email="email1@gmail.com"};
            UserAccount hugo = new UserAccount { UserID = 1, Username="Hugo", Password= Sys_Security.SHA256_Hash("M@zariego"), Email="email2@gmail.com"};
            UserAccount andrew = new UserAccount { UserID = 3, Username="Andrew", Password= Sys_Security.SHA256_Hash("Bev!lacqua"), Email="email3@gmail.com"};
            UserAccount ulysses = new UserAccount { UserID = 4, Username="Ulysses", Password= Sys_Security.SHA256_Hash("Riv&ra"), Email="email4@gmail.com"};
            UserAccount dani = new UserAccount { UserID = 5, Username="Hugo", Password= Sys_Security.SHA256_Hash("Mar+inez"), Email="email5@gmail.com"};
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
        [HttpPost("Create")]
        public int CreateNewUser([FromBody] NewAccountModel potentialAccount)
        {
            if(UserAccountsDataTable.EmailInUse(potentialAccount.Email))
            {
                if(Sys_Security.VerifyNewPass(potentialAccount.Password))
                {
                    UserAccount newAccount = new UserAccount(potentialAccount.Username, Sys_Security.SHA256_Hash(potentialAccount.Password), potentialAccount.Email);
                    UserAccountsDataTable.AddNewAccount(newAccount);
                    return newAccount.UserID;
                }
                else
                {
                    return -1;
                    /* 
                        Return error message "Password does not meet password requirements."
                        Include password policy:
                                - Minimum of 8 character
                                - One upper case letter
                                - One lower case letter
                                - One number
                    */
                }
            }
            else
            {
                return -1;
                /* 
                   Return error message "Email is already in use."
                */
            }
        }
    }
}