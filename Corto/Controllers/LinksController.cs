using Corto.Links;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Corto.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class LinksController : ControllerBase
    {
        private readonly ILinkService _linkService;

        public LinksController(ILinkService linkService)
        {
            _linkService = linkService;
        }

        [HttpGet]
        public async Task<IActionResult> GetMyShortenedLinks()
        {
            var issuer =  User.FindFirst("iss")?.Value;
            var issuerId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(issuer) || string.IsNullOrEmpty(issuerId))
            {
                return Unauthorized("User ID is not available.");
            }

            var links = await _linkService.GetLinksByUserIdAsync($"{issuerId}@{issuer}");
            return Ok(links);
        }
    }
}
