using Microsoft.AspNetCore.Mvc;
using DOM.Presentation.Implementation.Interfaces;
using DOM.Presentation.Entities.login_db;
using DOM.Presentation.Models.Entities.Register;

namespace DOM.Presentation.Controllers.Api
{
    [Route("v1/api/register")]
    [ApiController]
    public class RegisterApiController :  ControllerBase
    {
        private readonly ILogger<RegisterApiController> _logger;
        private readonly IDbService _dbService;

        public RegisterApiController(
                ILogger<RegisterApiController> logger,
                IDbService dbservice
            ) 
        {
            _logger = logger;
            _dbService = dbservice;
        }

        [HttpGet]
        public ActionResult Get()
        {
            var Response = _dbService.Select<Register>("SELECT * FROM login_db.dbo.[Register]");
            return Ok(Response);
        }

        [HttpGet("{uid}")]
        public ActionResult GetByUid(string uid) { 
            
            var response  = _dbService.Select<Register>($"SELECT * FROM login_db.dbo.[Register] WHERE Uid = '{uid}'").FirstOrDefault();
            return Ok(response);
        }

        [HttpPost("")]
        public ActionResult Post([FromBody] RegisterInput registerInput) { 
            var response = _dbService.Execute($"INSERT login_db.dbo.[Register] (Uid,FirstName,LastName,Email,Password) VALUES (NEWID(),'{registerInput.FirstName}','{registerInput.LastName}','{registerInput.Email}','{registerInput.Password}')");

            if (response > 0)
                return Ok();

           return BadRequest();
        }

        [HttpPut("{uid}")]

        public ActionResult Put([FromBody] RegisterInput registerInput) { 
            var reponse = _dbService.Execute($"UPDATE login_db.dbo.[Register] SET FirstName = '{registerInput.FirstName}', LastName = '{registerInput.LastName}', Email = '{registerInput.Email}', Password = '{registerInput.Password}' WHERE Uid = '{registerInput.Uid}'");

            if (reponse > 0)
                return Ok();
            return BadRequest();
        }


        [HttpDelete("{uid}")]

        public ActionResult Delete([FromBody] RegisterInput registerInput)
        {
            var response = _dbService.Execute($"DELETE FROM login_db.dbo.[Register] WHERE Uid = '{registerInput.Uid}'");

            if (response > 0)
                return Ok();
                return BadRequest();

        }
    }
}
