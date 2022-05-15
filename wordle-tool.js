
var maxDisplay = 100

Array.prototype.removeByValue = function (val) {
	for (var i = 0; i < this.length; i++) {
  		if (this[i] === val) {
     		this.splice(i, 1);
      		i--;
    	}
  	}
	return this;
}

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
	var byPosRegexChars = ['.','.','.','.','.'];
	if (pos1_is.length > 0) {
		byPosRegexChars[0] = pos1_is;
	}
	if (pos2_is.length > 0) {
		byPosRegexChars[1] = pos2_is;
	}
	if (pos3_is.length > 0) {
		byPosRegexChars[2] = pos3_is;
	}
	if (pos4_is.length > 0) {
		byPosRegexChars[3] = pos4_is;
	}
	if (pos5_is.length > 0) {
		byPosRegexChars[4] = pos5_is;
	}
	let byPosRegex = new RegExp(byPosRegexChars.join(''))
	words.forEach(function(word, idx) {
		if (word.match(byPosRegex)) {
			reducedByPosition.push(word)
		}
	})
	// console.log(reducedByPosition)

	// dump anything we need to exclude
	var reducedByExclusion = []
	if (exclude.length > 0) {
		let excludeArr = exclude.split('').sort()
		let excludeRegex = new RegExp('[' + excludeArr.join('') + ']')
		reducedByPosition.forEach(function(word, idx) {
			if (word.match(excludeRegex) == null) {
				reducedByExclusion.push(word)
			}
		})
	} else {
		reducedByExclusion = reducedByPosition
	}

	// now exclude by position, as needed
	for (var i = 1; i <= 5; i++) {
		if ($("#pos"+i+"-exclude").prop("disabled")) {
			console.log("Not excluding position " + i)
			continue
		}
		let contents = $("#pos" + i + "-exclude").val()
		if (contents == null || contents.length == 0) {
			console.log("Nothing to exclude for position " + i + ", skipping...");
			continue
		}
		// let excludeRegex = new RegExp('[' + contents.split('').sort().join('') + ']')
		var toExclude = []
		reducedByExclusion.forEach(function(word, idx) {
			// if (word.match(excludeRegex)) {
			if (contents.includes(word.charAt(i-1))) {
				toExclude.push(word)
			}
		})
		toExclude.forEach(function(word, idx) {
			reducedByExclusion.removeByValue(word)
		})
	}

	// dump anything not including what we have to include
	var reducedByInclusion = []
	if (include.length > 0) {
		let includeArr = include.split('')
		reducedByExclusion.forEach(function(word, idx) {
			var include = true
			for (var i = 0; i < includeArr.length; i++) {
				if (!word.includes(includeArr[i])) {
					include = false
					break
				}
			}
			if (include) {
				reducedByInclusion.push(word)
			}
		})
	} else {
		reducedByInclusion = reducedByExclusion
	}

	console.log(reducedByInclusion)

	let display = reducedByInclusion.slice(0,maxDisplay)
	show(display)
}

function changeEnablement(num) {
	let contents = $("#pos" + num +"-is").val()
	$("#pos" + num + "-exclude").prop("disabled", contents != null && contents.length > 0)
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

