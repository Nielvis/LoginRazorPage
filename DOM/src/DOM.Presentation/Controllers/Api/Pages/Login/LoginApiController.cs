using DOM.Presentation.Entities.login_db;
using DOM.Presentation.Implementation.Interfaces;
using Microsoft.AspNetCore.Mvc;
using DOM.Presentation.Models.Entities.Login;


namespace DOM.Presentation.Controllers.Api
{
    [Route("v1/api/login")]
    [ApiController]
    public class LoginApiController : ControllerBase
    {
        private readonly IDbService _dbService;

        public LoginApiController(IDbService dbService)
        {
            _dbService = dbService;
        }

        // POST v1/api/login
        [HttpPost]
        public ActionResult Post([FromBody] LoginInput loginInput)
        {
            // Consulta no banco: verifica email + senha
            var user = _dbService
                .Select<Register>($"SELECT * FROM login_db.dbo.[Register] WHERE Email = '{loginInput.Email}' AND Password = '{loginInput.Password}'")
                .FirstOrDefault();

            if (user != null)
            {
                // Login ok, retorna OK e pode incluir algum dado do usuário
                // Se fosse MVC tradicional, aqui poderia usar Redirect("/pagina")
                return RedirectToAction("Index", "App");
            }

            // Usuário ou senha incorretos
            return BadRequest(new { Message = "Email ou senha incorretos" });
        }
    }
}
