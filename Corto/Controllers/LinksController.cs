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
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID is not available.");
            }

            var links = await _linkService.GetLinksByUserIdAsync(userId);
            return Ok(links);
        }
    }
}
