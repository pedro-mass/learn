using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.Logging;
using TheWorld.Models;
using TheWorld.ViewModels;

namespace TheWorld.Controllers.Api
{
  [Route("api/trips")]
  public class TripController : Controller
  {
    private ILogger<TripController> _logger;
    private IWorldRepository _repository;

    public TripController(IWorldRepository repository, ILogger<TripController> logger)
    {
      _repository = repository;
      _logger = logger;
    }

    [HttpGet("")]
    public JsonResult Get()
    {
      var results = Mapper.Map<IEnumerable<TripViewModel>>(_repository.GetAllTripsWithStops());

      return Json(results);
    }

    [HttpPost("")]
    public JsonResult Post([FromBody]TripViewModel vm)
    {
      try
      {
        if (ModelState.IsValid)
        {
          var newTrip = Mapper.Map<Trip>(vm);

          // Save to the Database
          _logger.LogInformation("Attempting to save a new trip");
          _repository.AddTrip(newTrip);

          if (_repository.SaveAll())
          {
            Response.StatusCode = (int)HttpStatusCode.Created;
            return Json(Mapper.Map<TripViewModel>(newTrip));
          }
        }
      }
      catch (Exception ex)
      {
        _logger.LogError("Failed to save new trip", ex);
        Response.StatusCode = (int)HttpStatusCode.BadRequest;
        return Json(new { Message = ex.Message });
      }

      Response.StatusCode = (int)HttpStatusCode.BadRequest;
      return Json(new { Message = "Failed", ModelState = ModelState });
    }
  }
}
