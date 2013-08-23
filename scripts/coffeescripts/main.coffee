generateSystem = (systemOptions) ->
	system = new LSystem(systemOptions["start"],systemOptions["rules"])
	console.log(system.run(systemOptions["iterations"]))

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
		visualOptions["length"] = $(this).find("[name='visual-length']").val() || 20
		visualOptions["left"] = $(this).find("[name='visual-left']").val() || 45
		visualOptions["right"] = $(this).find("[name='visual-right']").val() || 45
		visualOptions["heading"] = $(this).find("[name='visual-start']").val() || 20
		
		generateSystem(systemOptions,visualOptions)

	)
)

