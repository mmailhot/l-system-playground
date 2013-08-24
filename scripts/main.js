(function() {
  var generateSystem, resizeCanvas;

  generateSystem = function(systemOptions, visualOptions) {
    var drawSystem, err, results, system;
    try {
      system = new LSystem(systemOptions["start"], systemOptions["rules"]);
      results = system.run(systemOptions["iterations"]);
    } catch (_error) {
      err = _error;
      console.log("Error generating system " + err);
      alert("System could not be generated (Check your rules + start)");
      return;
    }
    try {
      drawSystem = new LSystemDrawer(document.getElementById('main-canvas'), visualOptions);
      return drawSystem.draw(results);
    } catch (_error) {
      err = _error;
      console.log("Error drawing system " + err);
      alert("System could not be drawn (likely pulled more off the stack than it put on");
    }
  };

  resizeCanvas = function() {
    var canvas;
    canvas = document.getElementById('main-canvas');
    canvas.width = window.innerWidth;
    return canvas.height = window.innerHeight;
  };

  $(document).ready(function() {
    $("#options").submit(function(e) {
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
      visualOptions["length"] = parseInt($(this).find("[name='visual-length']").val()) || 20;
      visualOptions["left"] = parseInt($(this).find("[name='visual-left']").val()) || 45;
      visualOptions["right"] = parseInt($(this).find("[name='visual-right']").val()) || 45;
      visualOptions["heading"] = parseInt($(this).find("[name='visual-start']").val()) || 20;
      visualOptions["origin"] = $(this).find("[name='visual-origin']:checked").val() || 0;
      console.log(visualOptions);
      return generateSystem(systemOptions, visualOptions);
    });
    return $(window).resize(function() {
      return resizeCanvas();
    });
  });

  $(window).load(function() {
    return resizeCanvas();
  });

}).call(this);
