angular.module("umbraco").component("segmentRuleDayOfWeekEditor", {
  templateUrl:
    "/App_Plugins/day-of-week-rule/segment-rule-day-of-week-editor.html",
  bindings: {
    rule: "<",
    config: "<",
    save: "&",
  },
});
