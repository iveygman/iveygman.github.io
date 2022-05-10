
var maxDisplay = 100

function recompute() {

	// sanity check! we can't exclude what needs to be included
	let exclude = $("#exclude").val()
	let include = $("#include").val()
	let combinedEI = exclude + include;
	if ((/([a-zA-Z]).*?\1/).test(combinedEI)) {
		alert("Can't include and exclude same letters!")
		return;
	}

	// same check for the exactly-specified positions
	let pos1_is = $("#pos1-is").val()
	let pos2_is = $("#pos2-is").val()
	let pos3_is = $("#pos3-is").val()
	let pos4_is = $("#pos4-is").val()
	let pos5_is = $("#pos5-is").val()
	if ((/([a-zA-Z]).*?\1/).test(exclude+pos1_is)) {
		alert("Can't exclude what we specified for position 1")
		return;
	}
	if ((/([a-zA-Z]).*?\1/).test(exclude+pos2_is)) {
		alert("Can't exclude what we specified for position 2")
		return;
	}
	if ((/([a-zA-Z]).*?\1/).test(exclude+pos3_is)) {
		alert("Can't exclude what we specified for position 3")
		return;
	}
	if ((/([a-zA-Z]).*?\1/).test(exclude+pos4_is)) {
		alert("Can't exclude what we specified for position 4")
		return;
	}
	if ((/([a-zA-Z]).*?\1/).test(exclude+pos5_is)) {
		alert("Can't exclude what we specified for position 5")
		return;
	}

	var reducedByPosition = [];
	words.forEach(function(word, idx) {
		if (pos1_is.length > 0 && word.charAt(0) == pos1_is) {
			reducedByPosition.push(word)
		} else if (pos2_is.length > 0 && word.charAt(1) == pos2_is) {
			reducedByPosition.push(word)
		} else if (pos3_is.length > 0 && word.charAt(2) == pos3_is) {
			reducedByPosition.push(word)
		} else if (pos4_is.length > 0 && word.charAt(3) == pos4_is) {
			reducedByPosition.push(word)
		} else if (pos5_is.length > 0 && word.charAt(4) == pos5_is) {
			reducedByPosition.push(word)
		}
	})
	console.log(reducedByPosition)

	let display = reducedByPosition.slice(0,maxDisplay)
	show(display)
}

function show(words) {
	// $('#possible').html("<i>" + )
	var disp = "";
	for (var i = 0; i < words.length; i++) {
		disp += "<span class='word'>" + words[i] + "</span>";
		if ( (i+1) % 5 == 0) {
			disp += "<br/>"
		}
	}
	$('#possible').html(disp);
}

