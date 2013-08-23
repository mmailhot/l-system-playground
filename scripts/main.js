(function() {
  var generateSystem;

  generateSystem = function(systemOptions) {
    var system;
    system = new LSystem(systemOptions["start"], systemOptions["rules"]);
    return console.log(system.run(systemOptions["iterations"]));
  };

  $(document).ready(function() {
    return $("#options").submit(function(e) {
      var rawRules, rule, systemOptions, values, visualOptions, _i, _len, _ref;
      e.preventDefault();
      systemOptions = {};
      systemOptions["start"] = $(this).find("[name='system-start']").val();
      if (!systemOptions["start"]) {
        alert("Please fill out the start value");
        return false;
      }
      systemOptions["iterations"] = parseInt($(this).find("[name='system-iterations']").val());
      if (!systemOptions["iterations"] || isNaN(systemOptions["iterations"])) {
        alert("Please fill out the iterations field with a number");
        return false;
      }
      rawRules = $(this).find("[name='system-rules']").val();
      if (!rawRules) {
        alert("Please fill out the rules");
        return false;
      }
      systemOptions["rules"] = {};
      _ref = rawRules.split("\n");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        rule = _ref[_i];
        values = rule.match(/^(\S+) -> (\S+)$/);
        if (values === null) {
          alert("Please enter valid rules");
          return false;
        }
        systemOptions["rules"][values[1]] = values[2];
      }
      visualOptions = {};
      visualOptions["length"] = $(this).find("[name='visual-length']").val() || 20;
      visualOptions["left"] = $(this).find("[name='visual-left']").val() || 45;
      visualOptions["right"] = $(this).find("[name='visual-right']").val() || 45;
      visualOptions["heading"] = $(this).find("[name='visual-start']").val() || 20;
      return generateSystem(systemOptions, visualOptions);
    });
  });

}).call(this);
