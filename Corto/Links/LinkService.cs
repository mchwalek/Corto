namespace Corto.Links
{
    public interface ILinkService
    {
        Task<IEnumerable<Link>> GetLinksByUserIdAsync(string userId);
    }

    public class LinkService : ILinkService
    {
        private static readonly List<Link> _linksSeed = new List<Link>()
        {
            new () { Id = 1, OriginalUrl = "google.com", ShortenedUrl = "asdf", UserId = "***REMOVED***" },
            new () { Id = 1, OriginalUrl = "amazon.com", ShortenedUrl = "qwer", UserId = "other" },
        };

        public Task<IEnumerable<Link>> GetLinksByUserIdAsync(string userId)
        {
            var links = _linksSeed.Where(x => x.UserId == userId);
            return Task.FromResult(links);
        }
    }
}
