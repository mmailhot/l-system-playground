class @LSystem 
	constructor: (@start, @rules) ->
		keys = []
		for replace of @rules
			keys.push replace
		@regexp = new RegExp(keys.join("|"),"gi")

	run: (iterations) ->
		results = @start
		rules = @rules
		for num in [0..iterations]
			results = results.replace(@regexp,(match) ->
				return rules[match]
				)
			alert(results)
		return results

class @LSystemDrawer
	constructor: (@canvas, @options)->
		if @options['origin'] == 'bottom-left'
			@pos = {x:10.0, y:@canvas.height-10.0}
		else if @options['origin'] == 'centre'
			@pos = {x:@canvas.width/2.0, y:@canvas.height/2.0}

		@heading = @options['heading']

		@stack = []

	draw: (commands) ->
		@canvas.width = @canvas.width #clears the canvas
		ctx = @canvas.getContext("2d")

		ctx.moveTo(@pos.x,@pos.y)
		for command in commands
			switch command
				when "F"
					this.moveForward()
					ctx.lineTo(@pos.x,@pos.y)
				when "-"
					this.turnLeft()
				when "+"
					this.turnRight()
				when "["
					@stack.push({
						x: @pos.x,
						y: @pos.y,
						heading: @heading
						})
				when "]"
					state = @stack.pop()
					@pos.x = state.x
					@pos.y = state.y
					@heading = state.heading
					ctx.moveTo(@pos.x,@pos.y)
		console.log("Adding Stroke")		
		ctx.stroke()

	moveForward: () ->
		@pos.x += @options['length']*Math.cos(@heading * Math.PI/180)
		@pos.y -= @options['length']*Math.sin(@heading * Math.PI/180)

	turnLeft: () ->
		@heading -= @options['left']
		while @heading <= -360
			@heading += 360

	turnRight: () ->
		@heading += @options['right']
		while @heading >= 360
			@heading -= 360
