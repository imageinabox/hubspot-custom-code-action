// Image in a Box
// Copyright 20222
// Simple Dynamic First & Email Populate

(function(){
	const quizlinkId = "quiz-link";
	const quiznameId = "quiz-name";
	let maxLoops = 10;
	let firstName = '';
	let emailAddress = '';

	function run() {
		document.getElementsByClassName("actions")[0].getElementsByClassName("hs-button primary large")[0].addEventListener("click", function (event) {
			firstName = document.getElementsByName("firstname")[0].value;
			emailAddress = document.getElementsByName("email")[0].value;
			setTimeout(buildDynamic, 100);
		});
	}
	setTimeout(run, 500);
	function buildDynamic() {
		if(  document.getElementById("quiz-name") !== null ) {
			let baseLink = document.getElementById(quizlinkId).getAttribute("data-url");
			document.getElementById(quizlinkId).href = baseLink + emailAddress;
			document.getElementById(quiznameId).innerHTML = firstName + ", ";
		} else {
			if( maxLoops > 0 ) {
				setTimeout(buildDynamic, 100);
				maxLoops--;
			}
		}
	}
})();