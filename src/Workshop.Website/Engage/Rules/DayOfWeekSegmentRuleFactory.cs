using Newtonsoft.Json;
using Umbraco.Engage.Infrastructure.Personalization.Segments;
using Umbraco.Engage.Infrastructure.Personalization.Segments.Rules;

namespace Workshop.Website.Engage.Rules;

public class DayOfWeekSegmentRuleFactory : ISegmentRuleFactory
{
    public string RuleType { get; } = "DayOfWeek";

    public ISegmentRule CreateRule(string config, bool isNegation, long id, long segmentId, DateTime created, DateTime? updated)
    {
        var typedConfig = JsonConvert.DeserializeObject<DayOfWeekSegmentRuleConfig>(config);

        return new DayOfWeekSegmentRule(id, segmentId, RuleType, config, isNegation, created, updated, typedConfig);
    }
}