sjbjl_pureajax = true;
language_code = 'it';

$.ajaxSetup({
	cache: false
});

$(document).ready(function() {

	$('fieldset fieldset[id^=fieldset_] input,fieldset fieldset[id^=fieldset_] select').attr('disabled',true);

	// GENERAL: operazioni preliminari menu
	$("#open").click(function(){
		$("div#menucontainer").slideDown("slow");
	});
	
	$("#close").click(function(){
		$("div#menucontainer").slideUp("slow");	
	});

	$("#menutoggle a").click(function () {
		$("#menutoggle a").toggle();
	});

	// GENERAL: mainform
	$('#reset').click(function() {
		$('#mainform')[0].reset();
	});

	$('#cancel').click(function() {
		history.back();
	});

	$('#print').click(function() {
		window.print();
	});

	$(':disabled').addClass('disabled');

	$('input[id$=_enable]').click(function() {
		var objid_array = this.id.split('_');
		var divtoenable = objid_array[0] + '_fields';
		var hiddenfield = objid_array[0] + '_hidden';

		if ($(this).attr('checked') == true) {
			$('#' + divtoenable + ' input').removeAttr('disabled').removeClass('disabled');
		} else {
			$('#' + divtoenable + ' input').attr('checked', false).attr('disabled','true').addClass('disabled');
		}
	});

	$("#username").focus();

	// GENERAL: serializzo le coppie nome valore e invio
	
	$('#mainform').submit(function() {
		if (sjbjl_checkform('mainform')) {
			$.post('ajax_core.php', $('#mainform').serialize(), function(msg) {
				var sjbjlresponse = eval( "(" + msg + ")" );
				errormessage(useobj('submit'),sjbjlresponse.message,false);
				sjbjlredirect(sjbjlresponse.gotopage);
			});
		}
		return false;
	});

	$('input[id$=_selected]').each(function() {
		var idtomod = this.id;
		$('#' + idtomod.replace('_selected','')).val(this.value);
	});

});