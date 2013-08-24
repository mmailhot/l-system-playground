(function() {
  var generateSystem, loadPreset, presets, resizeCanvas;

  presets = {
    "plant": {
      "system": {
        "start": "X",
        "rules": "X -> F-[[X]+X]+F[+FX]-X\nF -> FF",
        "iterations": "7"
      },
      "visual": {
        "length": "2",
        "left": "25",
        "right": "25",
        "heading": "65",
        "origin": "bottom-left"
      }
    },
    "dragon": {
      "system": {
        "start": "FX",
        "rules": "X -> X+YF\nY -> FX-Y",
        "iterations": "16"
      },
      "visual": {
        "length": "3",
        "left": "90",
        "right": "90",
        "heading": "180",
        "origin": "centre"
      }
    },
    "triangle": {
      "system": {
        "start": "F",
        "rules": "F -> G-F-G\nG -> F+G+F",
        "iterations": "8"
      },
      "visual": {
        "length": "2",
        "left": "60",
        "right": "60",
        "heading": "180",
        "origin": "bottom-right"
      }
    },
    "koch": {
      "system": {
        "start": "F",
        "rules": "F -> F+F-F-F+F",
        "iterations": "4"
      },
      "visual": {
        "length": "6",
        "left": "90",
        "right": "90",
        "heading": "0",
        "origin": "bottom-left"
      }
    }
  };

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

  loadPreset = function(name) {
    var form, preset;
    preset = presets[name];
    form = $('#options');
    form.find("[name='system-start']").val(preset["system"]["start"]);
    form.find("[name='system-rules']").val(preset["system"]["rules"]);
    form.find("[name='system-iterations']").val(preset["system"]["iterations"]);
    form.find("[name='visual-length']").val(preset["visual"]["length"]);
    form.find("[name='visual-left']").val(preset["visual"]["left"]);
    form.find("[name='visual-right']").val(preset["visual"]["right"]);
    form.find("[name='visual-start']").val(preset["visual"]["heading"]);
    return form.find("[value='" + preset["visual"]["origin"] + "']").prop("checked", true);
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
      visualOptions["heading"] = parseInt($(this).find("[name='visual-start']").val()) || 0;
      visualOptions["origin"] = $(this).find("[name='visual-origin']:checked").val();
      console.log(visualOptions);
      return generateSystem(systemOptions, visualOptions);
    });
    $(".load-preset").click(function() {
      return loadPreset($(this).attr('data-preset'));
    });
    return $(window).resize(function() {
      return resizeCanvas();
    });
  });

  $(window).load(function() {
    return resizeCanvas();
  });

}).call(this);
