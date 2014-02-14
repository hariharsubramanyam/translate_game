// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
var current_dict;
var autocomplete_source = [];
var selected_word;
$(function() {
	var lang_to = "English";
	var lang_from = "Spanish";
	current_dict = set_languages(lang_to, lang_from); // keys: words in @lang_to, values: corresponding words in @lang_from 	
	selected_word = random_word(current_dict);
	set_word_to_translate(current_dict[selected_word]);
	focus_on_input_box();
	set_button_handler();
	set_autocomplete();
});

function random_word(dict){
	var index = Math.floor(Math.random()*Object.keys(dict).length);
	var c = 0;
	for(var word in dict){
		if(c == index){
			// Uncomment the line below to display the word to the console (useful for debugging)
			//console.log(word);
			return word;
		}
		c++;
	}
}

function set_autocomplete(){
	for(var i in current_dict){
		autocomplete_source.push(i);
	}
	$("#txtAnswer").autocomplete({
		source:autocomplete_source,
		select:function(event, ui){
			var question = $("#lblTranslateMe").html();
			$("#txtAnswer").text("");
			var user_answer = ui.item.value;
			var correct_answer = selected_word;
			validate(question, user_answer, correct_answer);
			event.preventDefault();
		},
		minLength:3
	});
	$('#txtAnswer').keypress(function (e) {
		if (e.which == 13) {
			$("#btnAnswer").click();
			$("#txtAnswer").autocomplete("close");
		}
	});
}

function add_correct_response(question, answer){
	$("#lstCol1 li:eq(1)").after($("<li class='blue element'>"+question+"</li>"));
	$("#lstCol2 li:eq(1)").after($("<li class='blue element'>"+answer+"</li>"));
	$("#lstCol3 li:eq(1)").after($("<li class='element'>"+"&#x2713"+"</li>"));
}

function add_incorrect_response(question, incorrect_answer, correct_answer){
	if(incorrect_answer.length == 0)
		incorrect_answer = "NO RESPONSE";
	$("#lstCol1 li:eq(1)").after($("<li class='red element'>"+question+"</li>"));
	$("#lstCol2 li:eq(1)").after($("<li class='red element struck'>"+incorrect_answer+"</li>"));
	$("#lstCol3 li:eq(1)").after($("<li class='red element'>"+correct_answer+"</li>"));
}

function set_button_handler(){
	$("#btnAnswer").click(function(){
		var question = $("#lblTranslateMe").html();
		var user_answer = $("#txtAnswer").val();
		var correct_answer = selected_word;
		validate(question, user_answer, correct_answer);
		$("#txtAnswer").autocomplete("close");
	});
}

function validate(question, user_answer, correct_answer){
	if(user_answer == correct_answer){
		add_correct_response(question, user_answer);
	}else{
		add_incorrect_response(question, user_answer, correct_answer);
	}
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

function set_languages(lang_to, lang_from){
	$('#lblFromLanguageTitle').html(lang_from);
	$('#lblToLanguageTitle').html(lang_to);
	$('#lblFromLanguageHeading').html(lang_from);
	$('#lblToLanguageHeading').html(lang_to);
	return dicts[lang_to][lang_from];
}