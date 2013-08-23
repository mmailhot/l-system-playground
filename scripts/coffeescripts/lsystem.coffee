class @LSystem 
	constructor: (@start, @rules) ->
		keys = []
		for replace of @rules
			keys.push replace
		@regexp = new RegExp(keys.join("|"),"gi");

	run: (iterations) ->
		results = @start
		rules = @rules
		for num in [0..iterations]
			results = results.replace(@regexp,(match) ->
				return rules[match]
				)
			alert(results)
		return results