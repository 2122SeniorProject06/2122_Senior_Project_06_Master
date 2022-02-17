
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
            SetupTable(mainTable);
            List<object> results = DatabaseAccess.Select(mainTable);
            foreach(List<string> result in results)
            {
                JournalEntry entry = new JournalEntry(int.Parse(result[0]), result[1], result[2], int.Parse(result[3]));
                entries.Add(entry);
            }
            return new List<JournalEntry>();
        }

        private void SetupTable(string mainTable)
        {
            DatabaseAccess.CreateTable(mainTable, "ID int, Title varchar(256), Body varchar(256), userID int");
            //DatabaseAccess.AddEntryToTable(mainTable, "1, 'Starting My Journey', 'I''m an anxious mess, I hope this will help.', 8");
            //DatabaseAccess.AddEntryToTable(mainTable, "2, 'Feeling Better Already', 'Might just be a placebo thing, but it feels like I'm improving.', 8");
            //DatabaseAccess.AddEntryToTable(mainTable, "5, 'Dreams Are Lucid?', 'I''m not sure if it's coincidental, but I've been able to control my dreams since starting.', 8");
            //DatabaseAccess.AddEntryToTable(mainTable, "10, 'Always Around...', 'I thought I was going crazy, but I swear I've seen flashes of something in the corner of my eye.', 8");
            //DatabaseAccess.AddEntryToTable(mainTable, "66, 'No Escape', 'GetOutGetOutGetOutGetOutGetOutGetOutGetOutGetOutGetOutGetOut', 8");
        }
    }
}