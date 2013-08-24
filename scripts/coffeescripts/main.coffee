presets = {
	"plant":{
		"system":{
			"start":"X",
			"rules":"X -> F-[[X]+X]+F[+FX]-X\nF -> FF",
			"iterations":"7"
		},
		"visual":{
			"length":"2",
			"left":"25",
			"right":"25",
			"heading":"65",
			"origin":"bottom-left"
		}
	},
	"dragon":{
		"system":{
			"start":"FX",
			"rules":"X -> X+YF\nY -> FX-Y",
			"iterations":"16"
		},
		"visual":{
			"length":"3",
			"left":"90",
			"right":"90",
			"heading":"180",
			"origin":"centre"
		}
	},
	"triangle":{
		"system":{
			"start":"F",
			"rules":"F -> G-F-G\nG -> F+G+F",
			"iterations":"8"
		},
		"visual":{
			"length":"2",
			"left":"60",
			"right":"60",
			"heading":"180",
			"origin":"bottom-right"
		}
	},
	"koch":{
		"system":{
			"start":"F",
			"rules":"F -> F+F-F-F+F",
			"iterations":"4"
		},
		"visual":{
			"length":"6",
			"left":"90",
			"right":"90",
			"heading":"0",
			"origin":"bottom-left"
		}
	}


}

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

loadPreset = (name) ->
	preset = presets[name]
	form = $('#options')

	#load in system options
	form.find("[name='system-start']").val(preset["system"]["start"])
	form.find("[name='system-rules']").val(preset["system"]["rules"])
	form.find("[name='system-iterations']").val(preset["system"]["iterations"])

	#load in the visual options
	form.find("[name='visual-length']").val(preset["visual"]["length"])
	form.find("[name='visual-left']").val(preset["visual"]["left"])
	form.find("[name='visual-right']").val(preset["visual"]["right"])
	form.find("[name='visual-start']").val(preset["visual"]["heading"])
	form.find("[value='"+preset["visual"]["origin"]+"']").prop("checked",true)



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
		visualOptions["heading"] = parseInt($(this).find("[name='visual-start']").val()) || 0
		visualOptions["origin"] = $(this).find("[name='visual-origin']:checked").val() 

		console.log(visualOptions)

		generateSystem(systemOptions,visualOptions)

	)

	$(".load-preset").click(()->
		loadPreset($(this).attr('data-preset'))
	)

	$(window).resize(()->
		resizeCanvas()
	)
)

$(window).load(()->
	resizeCanvas()
)
