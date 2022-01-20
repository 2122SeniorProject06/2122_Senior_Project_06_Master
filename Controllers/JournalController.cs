
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using _2122_Senior_Project_06.Models;
namespace _2122_Senior_Project_06.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JournalController: ControllerBase
    {
        

        [HttpGet]
        public List<JournalEntry> Get() {
            return new List<JournalEntry>();
        }
    }
}