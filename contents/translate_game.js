// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
var current_dict;

$(function() {
	var lang_to = "German";
	var lang_from = "Italian";
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
			return word;
		}
		c++;
	}
}

function set_button_handler(){
	$("#btnAnswer").click(function(){
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