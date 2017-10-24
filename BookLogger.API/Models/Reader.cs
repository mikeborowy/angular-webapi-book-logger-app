using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BookLogger.API.Models
{
    public class Reader
    {
        [Key]
        public int ReaderId { get; set; }
        public string Name { get; set; }
        public int WeeklyReadingGoal { get; set; }
        public int TotalMinutesRead { get; set; }
    }
}