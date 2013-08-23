(function() {
  var LSystem;

  LSystem = (function() {
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

}).call(this);
