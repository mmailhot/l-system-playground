generateSystem = (systemOptions, visualOptions) ->
	try
		system = new LSystem(systemOptions["start"],systemOptions["rules"])
		results = system.run(systemOptions["iterations"])
	catch err
		console.log("Error generating system " + err)
		alert("System could not be generated (Check your rules + start)")
		return

	try
		drawSystem = new LSystemDrawer(document.getElementById('main-canvas'),visualOptions)
		drawSystem.draw(results)
	catch err
		console.log("Error drawing system " + err)
		alert("System could not be drawn (likely pulled more off the stack than it put on")
		return
	

resizeCanvas = () ->
	canvas = document.getElementById('main-canvas')
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight

$(document).ready(()->
	$("#options").submit((e)->
		e.preventDefault() 

		systemOptions = {}

		# Grab the system options
		systemOptions["start"] = $(this).find("[name='system-start']").val()
		if !systemOptions["start"]
			alert("Please fill out the start value")
			return false

		systemOptions["iterations"] = parseInt($(this).find("[name='system-iterations']").val())

		if !systemOptions["iterations"] || isNaN(systemOptions["iterations"])
			alert("Please fill out the iterations field with a number")
			return false

		rawRules = $(this).find("[name='system-rules']").val()
		if !rawRules
			alert("Please fill out the rules")
			return false

		#Parse rules
		systemOptions["rules"] = {}
		for rule in rawRules.split("\n")
			values = rule.match(/^(\S+) -> (\S+)$/)
			if values == null
				alert("Please enter valid rules")
				return false
			systemOptions["rules"][values[1]] = values[2]

		visualOptions = {}
		# Get the visual options
		visualOptions["length"] = parseInt($(this).find("[name='visual-length']").val()) || 20
		visualOptions["left"] = parseInt($(this).find("[name='visual-left']").val()) || 45
		visualOptions["right"] = parseInt($(this).find("[name='visual-right']").val()) || 45
		visualOptions["heading"] = parseInt($(this).find("[name='visual-start']").val()) || 20
		visualOptions["origin"] = $(this).find("[name='visual-origin']:checked").val() || 0

		console.log(visualOptions)

		generateSystem(systemOptions,visualOptions)

	)

	$(window).resize(()->
		resizeCanvas()
	)
)

$(window).load(()->
	resizeCanvas()
)
