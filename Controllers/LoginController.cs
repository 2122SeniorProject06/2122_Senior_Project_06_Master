using Microsoft.AspNetCore.Http;
using _2122_Senior_Project_06;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace _2122_Senior_Project_06.Controllers
{
    public class LoginController : ControllerBase
    {
        [ApiController]
        [Route("[controller]")]

        [HttpPost]
        public bool AuthenticateUser(LoginPage loginModel){
            //authenticate user from database
            return false;
        }
    }
}