(function() {
  this.LSystem = (function() {
    function LSystem(start, rules) {
      var keys, replace;
      this.start = start;
      this.rules = rules;
      keys = [];
      for (replace in this.rules) {
        keys.push(replace);
      }
      this.regexp = new RegExp(keys.join("|"), "gi");
    }

    LSystem.prototype.run = function(iterations) {
      var num, results, rules, _i;
      results = this.start;
      rules = this.rules;
      for (num = _i = 0; 0 <= iterations ? _i <= iterations : _i >= iterations; num = 0 <= iterations ? ++_i : --_i) {
        results = results.replace(this.regexp, function(match) {
          return rules[match];
        });
        alert(results);
      }
      return results;
    };

    return LSystem;

  })();

  this.LSystemDrawer = (function() {
    function LSystemDrawer(canvas, options) {
      this.canvas = canvas;
      this.options = options;
      if (this.options['origin'] === 'bottom-left') {
        this.pos = {
          x: 10.0,
          y: this.canvas.height - 10.0
        };
      } else if (this.options['origin'] === 'centre') {
        this.pos = {
          x: this.canvas.width / 2.0,
          y: this.canvas.height / 2.0
        };
      }
      this.heading = this.options['heading'];
      this.stack = [];
    }

    LSystemDrawer.prototype.draw = function(commands) {
      var command, ctx, state, _i, _len;
      this.canvas.width = this.canvas.width;
      ctx = this.canvas.getContext("2d");
      ctx.moveTo(this.pos.x, this.pos.y);
      for (_i = 0, _len = commands.length; _i < _len; _i++) {
        command = commands[_i];
        switch (command) {
          case "F":
            this.moveForward();
            ctx.lineTo(this.pos.x, this.pos.y);
            break;
          case "-":
            this.turnLeft();
            break;
          case "+":
            this.turnRight();
            break;
          case "[":
            this.stack.push({
              x: this.pos.x,
              y: this.pos.y,
              heading: this.heading
            });
            break;
          case "]":
            state = this.stack.pop();
            this.pos.x = state.x;
            this.pos.y = state.y;
            this.heading = state.heading;
            ctx.moveTo(this.pos.x, this.pos.y);
        }
      }
      console.log("Adding Stroke");
      return ctx.stroke();
    };

    LSystemDrawer.prototype.moveForward = function() {
      this.pos.x += this.options['length'] * Math.cos(this.heading * Math.PI / 180);
      return this.pos.y -= this.options['length'] * Math.sin(this.heading * Math.PI / 180);
    };

    LSystemDrawer.prototype.turnLeft = function() {
      var _results;
      this.heading -= this.options['left'];
      _results = [];
      while (this.heading <= -360) {
        _results.push(this.heading += 360);
      }
      return _results;
    };

    LSystemDrawer.prototype.turnRight = function() {
      var _results;
      this.heading += this.options['right'];
      _results = [];
      while (this.heading >= 360) {
        _results.push(this.heading -= 360);
      }
      return _results;
    };

    return LSystemDrawer;

  })();

}).call(this);
