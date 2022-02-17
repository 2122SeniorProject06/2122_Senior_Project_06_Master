
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using _2122_Senior_Project_06.Models;
using _2122_Senior_Project_06.SqlDatabase;
namespace _2122_Senior_Project_06.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JournalController: ControllerBase
    {
        

        [HttpGet]
        public List<JournalEntry> Get() {
            string mainTable = "JournalEntries";
            List<JournalEntry> entries = new List<JournalEntry>();
            DatabaseAccess.AddEntryToTable(mainTable, "1, 'Starting My Journey', 'I''m an anxious mess, I hope this will help.', 8");
            List<object> results = DatabaseAccess.Select(mainTable);
            foreach(List<string> result in results)
            {
                JournalEntry entry = new JournalEntry(int.Parse(result[0]), result[1], result[2], int.Parse(result[3]));
                entries.Add(entry);
            }
            return new List<JournalEntry>();
        }
    }
}