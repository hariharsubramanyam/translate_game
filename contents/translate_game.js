// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
var current_dict;

$(function() {
	var lang_to = "English";
	var lang_from = "Spanish";
	current_dict = set_languages(lang_to, lang_from); // keys: words in @lang_to, values: corresponding words in @lang_from 	
	var selected_word = random_word(current_dict);
	set_word_to_translate(selected_word)
	focus_on_input_box();
	set_button_handler();

	
});

function random_word(dict){
	var index = Math.floor(Math.random()*Object.keys(dict).length);
	var c = 0;
	for(var word in dict){
		if(c == index){
			console.log(current_dict[word]);
			return word;
		}
		c++;
	}
}

function add_correct_response(question, answer){
	$("#lstCol1 li:eq(1)").after($("<li class='blue element'>"+question+"</li>"));
	$("#lstCol2 li:eq(1)").after($("<li class='blue element'>"+answer+"</li>"));
	$("#lstCol3 li:eq(1)").after($("<li class='element'>"+"&#x2713"+"</li>"));
}

function add_incorrect_response(question, incorrect_answer, correct_answer){
	$("#lstCol1 li:eq(1)").after($("<li class='red element'>"+question+"</li>"));
	$("#lstCol2 li:eq(1)").after($("<li class='red element struck'>"+incorrect_answer+"</li>"));
	$("#lstCol3 li:eq(1)").after($("<li class='red element'>"+correct_answer+"</li>"));
}

function set_button_handler(){
	$("#btnAnswer").click(function(){
		var question = $("#lblTranslateMe").html();
		var user_answer = $("#txtAnswer").val();
		var correct_answer = current_dict[question];
		if(user_answer == correct_answer){
			add_correct_response(question, user_answer);
		}else{
			add_incorrect_response(question, user_answer, correct_answer);
		}
		clear_input_box();
		focus_on_input_box();
		set_word_to_translate(random_word(current_dict));
	});
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