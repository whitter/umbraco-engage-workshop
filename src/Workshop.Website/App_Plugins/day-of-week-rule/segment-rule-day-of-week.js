angular.module("umbraco").run([
  "umsSegmentRuleRepository",
  function (ruleRepo) {
    var rule = {
      name: "Day of week",
      type: "DayOfWeek",
      iconUrl:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA7QAAAO0Bq2+TWQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHcSURBVFiF5Zexb9NQEMZ/XxTEEFQJwpSFzS1rGWFhInMUhPoXMGekfxBV1ZGpEwuMTJESFUUhYo7EQgaClOvge62b2o6duKYSn3TS+d073+d7d+89y8xIg6QG8NkfX5vZKnViBgr7m1mqABFgLlHWvF39Gzkf0cjQi6KQfxNAUgt4BzwHHrjtcWLeB0m/ShLI8v8LjIFTM1sAdIAJ1+mqSyZAR8BH4AhYAV+BhTN9BLxy/Qvwu2QGsvxbwEviZTkBmDujwVoRHSTYHmxRhJn+wMDH5w2g7czGJb9wF4RY7WbOpB/Az4ReFoX8MwmY2R9JUdDLRi/qn5eBrQKX9U8SeC+pu0vAEngWFBFX4z9DMgPfiFuyDjwFXoSH0Kvdsr2+rQDdEHebQ6ZSpBKQtCdpJMlcRpL2qrJvJAA8IT7PAyIfq8p+hdR9wMxmvomEl3w3s1lV9o0E/CVTYHpX9o0EJL0hvqAAjM3svEr7DbKstSGwz+0LxH6F9qs2zMrADPhEYg19rCp7fgb+q40odQkkPQTOuJnCt+F43dW+jvtXhGZ24XeDZBtdVGVfx9LZ9Goswp7HXDaBIXAIHEuC6/+Cu0ILOHZ9CNCn/r+iIP2Qkj7xjWhZQ9Clx+qbGZcKDfX8hx8/qgAAAABJRU5ErkJggg==",
      order: 4,

      defaultConfig: {
        dayOfWeek: [],
      },

      data: {
        days: {
          0: "Sunday",
          1: "Monday",
          2: "Tuesday",
          3: "Wednesday",
          4: "Thursday",
          5: "Friday",
          6: "Saturday",
        },
      },

      components: {
        display: "segment-rule-day-of-week-display",
        editor: "segment-rule-day-of-week-editor",
      },
    };

    ruleRepo.addRule(rule);
  },
]);
