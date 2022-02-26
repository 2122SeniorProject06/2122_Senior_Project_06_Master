
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using _2122_Senior_Project_06.Types;
using _2122_Senior_Project_06.SqlDatabase;
using System;
namespace _2122_Senior_Project_06.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JournalController: ControllerBase
    {
        

        [HttpGet]
        public List<JournalEntry> GetAll(string userID)
        {
            if(UserAccountsDataTable.UIDInUse(userID))
            {
                return JournalsDataTable.GetAllJournals(userID);
            }
            else
            {
                //exception
                //What if the user does not exist
                //Possible for a person to input a Random ID through the http request sent by frontend
                return null;
            }
            
        }

        [HttpGet("GetJournal")]
        public JournalEntry GetJournal(string journalID)
        {
            if(JournalsDataTable.JournalIDInUse(journalID))
            {
                //Journal entry might not be decoded
                return JournalsDataTable.GetJournalEntry(journalID);
            }
            else
            {
                //exception
                //What if the journal does not exist
                //Possible for a person to input a Random ID through the http request sent by frontend
                return null;
            }
        }
        
        // CREATE
        [HttpPost("Create")]
        public IActionResult Create([FromBody] JournalEntry newEntry)
        {
            try
            {
                //Technically No JID is created
                // following AddNewEntry -> check .ToSqlString in journalentry.cs
                newEntry.LastUpdated = DateTime.Now;
                JournalsDataTable.AddNewEntry(newEntry);
                return Ok();
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return StatusCode(418);
            }
        }

        [HttpPut("Update")]
        // UPDATE
        public IActionResult Update(JournalEntry updatedEntry)
        {
            try
            {
                updatedEntry.LastUpdated = DateTime.Now;
                JournalsDataTable.UpdateJournalEntry(updatedEntry);
                return Ok();
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return StatusCode(418);
            }
        }

        // DELETE
        [HttpDelete("Delete")]
        public IActionResult Delete(string journalID)
        {
            try
            {
                JournalsDataTable.DeleteEntry(journalID);
                return Ok();
            }
            catch(Exception e)
            {
                Console.WriteLine(e.Message);
                return StatusCode(418);
            }
        }
    }
}