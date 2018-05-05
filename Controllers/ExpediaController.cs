using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExpediaWOffers.Models;
using ExpediaWOffers.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace ExpediaWOffers.Controllers
{
    [Produces("application/json")]
    [Route("api/Expedia")]
    public class ExpediaController : Controller
    {

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] SearchCriteria criteria)
        {
            try
            {
                var result = await ExpediaService.GetOffers(criteria);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}