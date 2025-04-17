using Umbraco.Cms.Core.Composing;
using Umbraco.Engage.Infrastructure.Personalization.Segments.Rules;
using Umbraco.Engage.Web.Cockpit.Segments;
using Workshop.Website.Engage.Rules;

namespace Workshop.Website.Engage;

public class SegmentRulesComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.AddTransient<ISegmentRuleFactory, DayOfWeekSegmentRuleFactory>();
        builder.Services.AddTransient<ICockpitSegmentRuleFactory, DayOfWeekCockpitSegmentRuleFactory>();
    }
}