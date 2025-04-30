using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;
using Microsoft.Extensions.Options;

namespace Workshop.Website.Revalidate
{
    public class NextJsRevalidateDictionaryNotificationHandler : INotificationAsyncHandler<DictionaryItemSavedNotification>
    {
        private readonly NextJsRevalidateService _revalidateService;
        private readonly NextJsRevalidateOptions _config;
        private readonly ILogger<NextJsRevalidatePublishedNotificationHandler> _logger;

        public NextJsRevalidateDictionaryNotificationHandler(NextJsRevalidateService revalidateService,
            IOptions<NextJsRevalidateOptions> options,
            ILogger<NextJsRevalidatePublishedNotificationHandler> logger)
        {
            _revalidateService = revalidateService;
            _config = options.Value;
            _logger = logger;
        }

        public async Task HandleAsync(DictionaryItemSavedNotification notification, CancellationToken cancellationToken)
        {

            if (_config.Enabled && notification.SavedEntities.Any())
            {
                _logger.LogInformation("Localisation next js revalidation triggered");
                await _revalidateService.ForLocalisation();
            }
        }
    }
}
