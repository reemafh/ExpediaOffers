using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExpediaWOffers.Models
{
    public class SearchCriteria
    {
   
            public string destinationCity { get; set; }
            public int? lengthOfStay { get; set; }
            public decimal? maxStarRating { get; set; }
            public decimal? minStarRating { get; set; }
            public decimal? maxGuestRating { get; set; }
            public decimal? minGuestRating { get; set; }
            public DateTime? maxTripStartDate { get; set; }
            public DateTime? minTripStartDate { get; set; }

    }

}
