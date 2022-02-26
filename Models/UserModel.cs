using System;
using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace  _2122_Senior_Project_06.Models
{
    public class UserModel
    {
        public string userID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }
    // may need to transfer User and New Account functions to new model
}