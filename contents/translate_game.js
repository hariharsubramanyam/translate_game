// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.

// The current dictionary we are using for the game
var current_dict;

// The array that will contain all the autocomplete suggestions
var autocomplete_source = [];

// The current word that the user must guess (in the language specified by lang_to)
var selected_word;

/*
	On document load, set up variables, UI elements, and handlers
*/
$(function() {

	// Get the dictionary
	var lang_to = "English";
	var lang_from = "Spanish";
	current_dict = set_languages(lang_to, lang_from); // keys: words in @lang_to, values: corresponding words in @lang_from 	

	// Select a word put it in the UI
	selected_word = random_word(current_dict);
	set_word_to_translate(current_dict[selected_word]);

	// Create handlers, autocomplete, and get ready for input
	focus_on_input_box();
	set_button_handler();
	set_autocomplete();
});

/*
	dict - the current dictionary (keys are words in language lang_to, and values are words in language lang_from)
	
	Return a random word in the dictionary (in language lang_to)
*/
function random_word(dict){
	// Randomly generate the index of a word
	var index = Math.floor(Math.random()*Object.keys(dict).length);
	var c = 0;

	// find that word in the dictionary
	for(var word in dict){
		if(c == index){
			// Uncomment the line below to display the word to the console (useful for debugging)
			//console.log(word);
			return word;
		}
		c++;
	}
}

/*
	Create the handler for the autocomplete
*/
function set_autocomplete(){
	// Put possible answers into the autocomplete source
	for(var i in current_dict){
		autocomplete_source.push(i);
	}

	// Create autocomplete
	$("#txtAnswer").autocomplete({
		source:autocomplete_source,	// source = possible words in language lang_to 
		select:function(event, ui){	// on select, check if the user's response is correct
			var question = $("#lblTranslateMe").html();
			$("#txtAnswer").text("");
			var user_answer = ui.item.value;
			var correct_answer = selected_word;
			validate(question, user_answer, correct_answer);
			event.preventDefault();
		},
		minLength:3					// require at least 3 characters before showing suggestions
	});

	// If the user presses "enter" we want to submit the answer
	$('#txtAnswer').keypress(function (e) {
		if (e.which == 13) {
			$("#btnAnswer").click();
			$("#txtAnswer").autocomplete("close");
		}
	});
}

/*
	Add items to the lists accordingly when we have a correct response
*/
function add_correct_response(question, answer){
	$("#lstCol1 li:eq(1)").after($("<li class='blue element'>"+question+"</li>"));
	$("#lstCol2 li:eq(1)").after($("<li class='blue element'>"+answer+"</li>"));
	$("#lstCol3 li:eq(1)").after($("<li class='element'>"+"&#x2713"+"</li>"));
}

/*
	Add items to the lists accordingly when we have an incorrect response
*/
function add_incorrect_response(question, incorrect_answer, correct_answer){
	if(incorrect_answer.length == 0)
		incorrect_answer = "NO RESPONSE";
	$("#lstCol1 li:eq(1)").after($("<li class='red element'>"+question+"</li>"));
	$("#lstCol2 li:eq(1)").after($("<li class='red element struck'>"+incorrect_answer+"</li>"));
	$("#lstCol3 li:eq(1)").after($("<li class='red element'>"+correct_answer+"</li>"));
}

/*
	When the answer button is clicked, figure out what the user inputted and validate the result
*/
function set_button_handler(){
	$("#btnAnswer").click(function(){
		var question = $("#lblTranslateMe").html();
		var user_answer = $("#txtAnswer").val();
		var correct_answer = selected_word;
		validate(question, user_answer, correct_answer);
		$("#txtAnswer").autocomplete("close");
	});
}

/*
	Check if the user is correct, and then prepare the next word
*/
function validate(question, user_answer, correct_answer){
	// is the user correct or incorrect?
	if(user_answer == correct_answer){
		add_correct_response(question, user_answer);
	}else{
		add_incorrect_response(question, user_answer, correct_answer);
	}

	// reset inputs and move on to the next word
	clear_input_box();
	focus_on_input_box();
	selected_word = random_word(current_dict);
	set_word_to_translate(current_dict[selected_word]);

}


function clear_input_box(){
	$("#txtAnswer").val("");
}

function focus_on_input_box(){
	$("#txtAnswer").focus();
}

function set_word_to_translate(selected_word){
	$("#lblTranslateMe").html(selected_word);
}

/*
	Updates the UI to reflect the new languages
	Returns the dictionary fo the current language
*/
function set_languages(lang_to, lang_from){
	$('#lblFromLanguageTitle').html(lang_from);
	$('#lblToLanguageTitle').html(lang_to);
	$('#lblFromLanguageHeading').html(lang_from);
	$('#lblToLanguageHeading').html(lang_to);
	return dicts[lang_to][lang_from];
}