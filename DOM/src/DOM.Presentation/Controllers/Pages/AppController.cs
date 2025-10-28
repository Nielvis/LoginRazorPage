using System.Diagnostics;
using DOM.Presentation.Models;
using Microsoft.AspNetCore.Mvc;
namespace DOM.Presentation.Controllers.Pages { 
    public class AppController : Controller 
    { private readonly ILogger<AppController> _logger; 
        public AppController(ILogger<AppController> logger) 
        {
            _logger = logger; 
        } 
        public IActionResult Index()
        { 
            return View(); 
        } 
        public IActionResult Register() 
        { 
            return View(); 
        } 
        public IActionResult Cadastre() 
        { 
            return View(); 
        } 
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error() 
        { 
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier }); 
        } 
    }
}
