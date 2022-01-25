using System;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace  _2122_Senior_Project_06.Models
{
    /// <summary>
    /// The class that manages the login page.
    /// </summary>
    /// <remarks> Made by Hugo Mazariego. Last update 12/09/2021. </remarks>
    public class JournalEntry 
    {
        public string _title {get; set;}
        public string _body {get; set;}
        
        public int _userId {get;}
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int _id {get; private set;}

    }
}