/*****************************************************************//*

sjbjl - Smart jQuery Based JavaScript Library
	version 0.9.9.9z
	completed on 24/02/2012 11:00
	by rodenic 

based upon jQuery core:
	jQuery Library 1.4.4 (legacy)			http://docs.jquery.com/Downloading_jQuery
	jQuery Library 1.7						http://docs.jquery.com/Downloading_jQuery
	jQuery UI 1.8.9							http://jqueryui.com/download

selected jQuery plugins:
	jQuery Masked Input plugin 1.3			http://digitalbush.com/projects/masked-input-plugin/
	jQuery nyroModal plugin 2.0.0			http://nyromodal.nyrodev.com/
	jQuery Uploadify plugin 2.1.4			http://www.uploadify.com/
	jQuery iColorPicker plugin 2009			http://www.supersite.me/index.php?p=1_2&n=11-iColorPicker-jQuery-Color-Picker
	jQuery Autocomplete (bassistance) 1.1	http://bassistance.de/jquery-plugins/jquery-plugin-autocomplete ### DEPRECATED ###

other embedded contributions:
	Sortable Table 1.12						http://webfx.eae.net/dhtml/sortabletable/sortabletable.html
	SWFObject v2.2							http://code.google.com/p/swfobject/
	The Flowplayer API 3.2.7				http://flowplayer.org/download/index.html
	Flowplayer Playlist plugin 3.0.8		http://flowplayer.org/plugins/javascript/playlist.html
	Flowplayer Audio plugin 3.2.2			http://flowplayer.org/plugins/streaming/audio.html

*//*****************************************************************/

// sjbjl configuration

// form field error message
var errormsgtimer = 30;
var errormsgspeed = 10;
var errormsghide = 3500; // milliseconds

var sjbjlform_sent = false;
var sjbjl_onlyedited = false;
var sjbjl_use_confirm = true;

var isCtrl = false;
var isAltGr = false;

if (typeof(sjbjl_pureajax) == 'undefined') {
	var sjbjl_pureajax = false;
}

if (typeof(sjbjl_decimal_separator) == 'undefined') {
	var sjbjl_decimal_separator = ',';
}

if (typeof(sjbjl_errorbgcolor) == 'undefined') {
	var sjbjl_errorbgcolor = '#FF8B00';
}

if (typeof(language_code) == 'undefined') {
	var language_code = 'en';
}

if (typeof(sjbjl_user_device) == 'undefined') {
	var sjbjl_user_device = 'desktop';
}

switch (language_code) {
	case 'it':
	jQuery(function($){$.datepicker.regional['it'] = {closeText: 'Chiudi',prevText: '&#x3c;Prec',nextText: 'Succ&#x3e;',currentText: 'Oggi',monthNames: ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],monthNamesShort: ['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'],dayNames: ['Domenica','Luned&#236','Marted&#236','Mercoled&#236','Gioved&#236','Venerd&#236','Sabato'],dayNamesShort: ['Dom','Lun','Mar','Mer','Gio','Ven','Sab'],dayNamesMin: ['Do','Lu','Ma','Me','Gi','Ve','Sa'],weekHeader: 'Sm',dateFormat: 'dd/mm/yy',firstDay: 1,isRTL: false,showMonthAfterYear: false,yearSuffix: ''};$.datepicker.setDefaults($.datepicker.regional['it']);});
	break;

	case 'en':
	jQuery(function($){$.datepicker.regional['en-GB'] = {closeText: 'Done',prevText: 'Prev',nextText: 'Next',currentText: 'Today',monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],weekHeader: 'Wk',dateFormat: 'dd/mm/yy',firstDay: 1,isRTL: false,showMonthAfterYear: false,yearSuffix: ''};$.datepicker.setDefaults($.datepicker.regional['en-GB']);});
	break;

	case 'de':
	jQuery(function($){$.datepicker.regional['de'] = {closeText: 'schließen',prevText: '&#x3c;zurück',nextText: 'Vor&#x3e;',currentText: 'heute',monthNames: ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],monthNamesShort: ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'],dayNames: ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],dayNamesShort: ['So','Mo','Di','Mi','Do','Fr','Sa'],dayNamesMin: ['So','Mo','Di','Mi','Do','Fr','Sa'],weekHeader: 'Wo',dateFormat: 'dd.mm.yy',firstDay: 1,isRTL: false,showMonthAfterYear: false,yearSuffix: ''};$.datepicker.setDefaults($.datepicker.regional['de']);});
	break;
}

if (typeof(sjbjl_path) == 'undefined') {
	var sjbjl_path = '../';
}

// form fields base datatype list
var alphalowercase = "abcdefghijklmnopqrstuvwxyz";
var alphalowercase_msg = "[a..z]";

var alphauppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var alphauppercase_msg = "[A..Z]";

var alphaextrachars = "àèéìòù";
var alphaextrachars_msg = "[àèéìòù]";

var integer = "0123456789";
var integer_msg = "[0..9]";

var numericdecimal = "0123456789" + sjbjl_decimal_separator;
var numericdecimal_msg = "[0..9" + sjbjl_decimal_separator + "]";

var numerichexadecimal = "1234567890abcdefABCDEF";
var numerichexadecimal_msg = "[0..9,a..f,A..F]";

var daterange = "1234567890/";
var daterange_msg = "[1-31/1-12/1900-2030]";

var validchars = new Array();
var validchmsg = new Array();
var validregex = new Array();
var validminl = new Array();
var validmaxl = new Array();
var validsamp = new Array();

// form simple fields valuetype list
validchars['alpha'] = alphalowercase + alphauppercase;
validchmsg['alpha'] = alphalowercase_msg + " " + alphauppercase_msg;

validchars['alphauppercase'] = alphauppercase;
validchmsg['alphauppercase'] = alphauppercase_msg;

validchars['alpha_extended'] = alphalowercase + alphauppercase + alphaextrachars + " '";
validchmsg['alpha_extended'] = alphalowercase_msg + " " + alphauppercase_msg + alphaextrachars_msg + " [']";

validchars['alphanumeric'] = alphalowercase + alphauppercase + numericdecimal;
validchmsg['alphanumeric'] = alphalowercase_msg + " " + alphauppercase_msg + " " + numericdecimal_msg;

validchars['alphanumeric_extended'] = alphalowercase + alphauppercase + numericdecimal + "-_ ";
validchmsg['alphanumeric_extended'] = alphalowercase_msg + " " + alphauppercase_msg + " " + numericdecimal_msg + " [-_ ]";

validchars['alphanumeric_blank'] = alphalowercase + alphauppercase + numericdecimal + " ";
validchmsg['alphanumeric_blank'] = alphalowercase_msg + " " + alphauppercase_msg + " " + numericdecimal_msg + " [ ]";

validchars['integer'] = integer;
validchmsg['integer'] = integer_msg;

validchars['numeric'] = numericdecimal;
validchmsg['numeric'] = numericdecimal_msg;

validchars['date'] = numericdecimal + "/";
validchmsg['date'] = daterange_msg;
validminl['date'] = 10;
validmaxl['date'] = 10;

validchars['time'] = numericdecimal;
validchmsg['time'] = numericdecimal_msg;

validchars['color'] = numerichexadecimal + '#';
validchmsg['color'] = numerichexadecimal_msg + ' [#]';

validchars['username'] = alphalowercase + alphauppercase + numericdecimal + ".";
validchmsg['username'] = alphalowercase_msg + " " + alphauppercase_msg + " " + numericdecimal_msg;

validchars['password'] = alphalowercase + alphauppercase + numericdecimal + "àèéìòù|!£$%&()=?^*°§#@;:_,.-&/'<>+";
validchmsg['password'] = alphalowercase_msg + " " + alphauppercase_msg + " " + numericdecimal_msg + "<br />" + "[àèéìòù|!£$%&()=?^*°§#@;:_,.-&/'<>+]";

validchars['codice_fiscale'] = alphalowercase + alphauppercase + numericdecimal;
validchmsg['codice_fiscale'] = alphauppercase_msg + " " + alphauppercase_msg + " " + numericdecimal_msg;
validminl['codice_fiscale'] = 16;
validmaxl['codice_fiscale'] = 16;
validsamp['codice_fiscale'] = 'ABCLMN71A21A551S';

validchars['partita_iva'] = integer;
validchmsg['partita_iva'] = integer_msg;
validminl['partita_iva'] = 11;
validmaxl['partita_iva'] = 11;
validsamp['partita_iva'] = '12345678901';

validchars['sex'] = 'mfMF';
validchmsg['sex'] = "[MF]";
validminl['sex'] = 1;
validmaxl['sex'] = 1;

// form medium complexity fields valuetype list
validchars['money'] = numericdecimal + "-+" + sjbjl_decimal_separator;
validchmsg['money'] = "[+-] " + numericdecimal_msg + " [" + sjbjl_decimal_separator + "]";

switch (sjbjl_decimal_separator) {
	case '.':
	validregex['money'] = /[\+\-]?\d+(?:[\.]\d*)?/;
	break;

	case ',':
	default:
	validregex['money'] = /[\+\-]?\d+(?:[\,]\d*)?/;
	break;
}


validchars['phone'] = numericdecimal + "+";
validchmsg['phone'] = "[+] " + numericdecimal_msg;
validregex['phone'] = /\+[0-9]+/;

// form high complexity fields valuetype list

// NEW VALUE TYPES

validchars['ipv4'] = numericdecimal + ".";
validchmsg['ipv4'] = numericdecimal_msg + " [.]";
validregex['ipv4'] = /^((0?[0-9]?[0-9]|0?1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}(0?[0-9]?[0-9]|0?1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
validminl['ipv4'] = 7;
validsamp['ipv4'] = '<br />192.168.0.1<br />255.255.255.255';

validchars['ipv6'] = numerichexadecimal + ":";
validchmsg['ipv6'] = numerichexadecimal_msg + " [:]";
validregex['ipv6'] = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
validminl['ipv6'] = 15;
validsamp['ipv6'] = '2001:0db8:85a3:0000:1319:8a2e:0370:7344';

validchars['mac'] = numerichexadecimal + "-";
validchmsg['mac'] = numerichexadecimal_msg + " [-]";
validregex['mac'] = /^[0-9A-Fa-f]{2}\-[0-9A-Fa-f]{2}\-[0-9A-Fa-f]{2}\-[0-9A-Fa-f]{2}\-[0-9A-Fa-f]{2}\-[0-9A-Fa-f]{2}$/;
validminl['mac'] = 17;
validsamp['mac'] = '<br />00-11-22-AA-BB-CC';

validchars['email'] = alphalowercase + alphauppercase + numericdecimal + "-_@.";
validchmsg['email'] = alphalowercase_msg + " " + alphauppercase_msg + " " + numericdecimal_msg + " [-_@.]";
validregex['email'] = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
validminl['email'] = 6;
validsamp['email'] = 'info@abc.com';

validchars['bei'] = alphauppercase + numericdecimal;
validchmsg['bei'] = alphauppercase_msg + " " + numericdecimal_msg;
validregex['bei'] = /[A-Z]{6,6}[A-Z2-9][A-NP-Z0-9]([A-Z0-9]{3,3}){0,1}/;
validminl['bei'] = 8;
validmaxl['bei'] = 11;
validsamp['bei'] = 'ABCDEF2N';

validchars['bic'] = alphauppercase + numericdecimal;
validchmsg['bic'] = alphauppercase_msg + " " + numericdecimal_msg;
validregex['bic'] = /[A-Z]{6,6}[A-Z2-9][A-NP-Z0-9]([A-Z0-9]{3,3}){0,1}/;
validminl['bic'] = 8;
validmaxl['bic'] = 11;
validsamp['bic'] = 'GHIJKLZ90ZA';

validchars['ibei'] = alphauppercase + numericdecimal;
validchmsg['ibei'] = alphauppercase_msg + " " + numericdecimal_msg;
validregex['ibei'] = /[A-Z]{2,2}[B-DF-HJ-NP-TV-XZ0-9]{7,7}[0-9]{1,1}/;
validminl['ibei'] = 10;
validmaxl['ibei'] = 10;
validsamp['ibei'] = 'AZCGIOUY58';

validchars['uschu'] = numericdecimal + "CH";
validchmsg['uschu'] = "[CH] " + numericdecimal_msg;
validregex['uschu'] = /^CH[0-9]{6,6}/;
validminl['uschu'] = 8;
validmaxl['uschu'] = 8;
validsamp['uschu'] = 'CH123456';

validchars['iban'] = alphalowercase + alphauppercase + numericdecimal + "-_";
validchmsg['iban'] = alphalowercase_msg + " " + alphauppercase_msg + " " + numericdecimal_msg;
validregex['iban'] = /[a-zA-Z]{2,2}[0-9]{2,2}[a-zA-Z0-9]{1,30}/;
validminl['iban'] = 5;
validmaxl['iban'] = 34;
validsamp['iban'] = 'DE-89-370400440532013000';

validchars['iban_italia'] = alphalowercase + alphauppercase + numericdecimal + "-_";
validchmsg['iban_italia'] = alphalowercase_msg + " " + alphauppercase_msg + " " + numericdecimal_msg;
validregex['iban_italia'] = /(:?IT|SM|it|sm)[0-9]{2,2}[a-zA-Z]{1,1}[0-9]{5,5}[0-9]{5,5}[a-zA-Z0-9]{12,12}/;
validminl['iban_italia'] = 27;
validmaxl['iban_italia'] = 27;
validsamp['iban_italia'] = 'IT-39-X-12345-12345-123456789123';

validchars['cuc'] = alphauppercase + numericdecimal;
validchmsg['cuc'] = alphauppercase_msg + " " + numericdecimal_msg;
validregex['cuc'] = /[0-9]{7}[A-Z]/;
validminl['cuc'] = 8;
validmaxl['cuc'] = 8;
validsamp['cuc'] = '0000115R';

validchars['nt35'] = numericdecimal + 'NT';
validchmsg['nt35'] = 'NT0123...33';
validregex['nt35'] = /^NT.{0,33}/;
validminl['nt35'] = 2;
validmaxl['nt35'] = 35;
validsamp['nt35'] = 'NT1234567890';

validchars['url'] = alphalowercase + alphauppercase + numericdecimal + '#//!:.?+=&%@!';
validchmsg['url'] = alphalowercase_msg + " " + alphauppercase_msg + " " + numericdecimal_msg + " [# / !:.?+=&%@]";
validregex['url'] = /^(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,4}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&amp;?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?$/;
validminl['url'] = 9;
validsamp['url'] = 'http://www.test.com';

// page onload event and functions
$(document).ready(function() {

	// transforms UL and LI in tabbed interface if DIV container has a particular class
	$('.sjbjl_tabbed').tabs({
		create: function(event,ui) {
			$(this).attr('style','visibility:visible');
		}
	});

	sjbjlform_sent = false;

	// redefine browser confirm returning the callback_ok or callback_ko if the user click on yes or no in modal dialogs
	if (sjbjl_use_confirm) {
		window.confirm = sjbjl_confirm;
	}

	// enable checkfield to select all checkfields with same themed label
	$('#sjbjl_check_all').click(function() {
		if($('#sjbjl_check_all').is(':checked')) {
			$("input[id^='sjbjl_check_all']").attr('checked','checked');
		} else {
			$("input[id^='sjbjl_check_all']").removeAttr('checked')
		}
	});

	// enable checkfield check_all if all single checkfield have been checked and vice versa
    $("input[id^='sjbjl_check_all_']").click(function() {
        var totale_check_all = $("input:checkbox[id^='sjbjl_check_all_']").size();
        var totale_check_all_selected = $("input:checkbox[id^='sjbjl_check_all_']:checked").size();
		if(totale_check_all != totale_check_all_selected) {
			$('#sjbjl_check_all').removeAttr('checked');
        } else {
			$('#sjbjl_check_all').attr('checked','checked');
        }
    });

	// activate listener on page to check if pressed (on key down)
	// special keys as ctrl, altGr and set some variables
	$(window).keydown(function(event) {

		var keydowned;

		if (window.event) {
			keydowned = window.event.keyCode;
		} else if (event) {
			keydowned = event.which;
		}

		switch (keydowned) {
			case 17:
			isCtrl = true;
			break;

			case 18:
			isAltGr = true;
			break;

			default:
			break;
		}

	});

	// activate listener on page to check if pressed (on key up)
	// special keys as ctrl, altGr and set some variables
	$(window).keyup(function(event) {

		var keyupped;

		if (window.event) {
			keyupped = window.event.keyCode;
		} else if (event) {
			keyupped = event.which;
		}

		switch (keyupped) {
			case 17:
			isCtrl = false;
			break;

			case 18:
			isAltGr = false;
			break;

			default:
			break;
		}

	});

	// treat forms with a particular class differently
	$('.sjbjl_form').each(function() {

		var sjbjl_form_id = $(this).attr("id");

		if (sjbjl_onlyedited) {
			$('#' + sjbjl_form_id + ' :input').bind('change keypress',function() {
				$(this).addClass('sjbjl_edited');
			});
		}

		// transforms pure submit in normal buttons with submit functionality
		$('#' + sjbjl_form_id + ' input[type=submit]').each(function() {
			var puresubmit_obj = $(this);
			var puresubmit_value = puresubmit_obj.attr("value");
			var puresubmit_classname = puresubmit_obj.attr("class");
			var puresubmit_tabindex = puresubmit_obj.attr("tabindex");
			var puresubmit_replace = "<input type='button' name='submit:" + sjbjl_form_id + "' id='submit:" + sjbjl_form_id + "' value='" + puresubmit_value + "' class='" + puresubmit_classname + "' tabindex='" + puresubmit_tabindex + "' />";
			$(this).replaceWith(puresubmit_replace);
		});

		sjbjl_setfieldproperties(sjbjl_form_id);
		$(this).bind("submit", function(e) {
			return sjbjl_checkform(sjbjl_form_id);
		});

	});

	// transforms gracefully buttons if they have a particular class
	$(".sjbjl_button,.sjbjl_submit").button();

	// hides details in table row
	$("table tr.hidden_tr_detail").hide();
	$("table td.detail_tr_opener").click(function() {
		$(this.parentNode).next(".hidden_tr_detail").toggle();
		$(this).toggleClass('up');
	});

	$("a.hidden_opener").click(function() {
		var objid = $(this).attr('href');
		$(objid + '_content').slideToggle('slow');
		return false;
	});

	// PLUGINS

	// nyromodal modal windows
	if(jQuery().nyroModal) {
		$('.nyroModal').nyroModal();
	}

	// sortable tables
	var sorttables = new Array();

	$('.sort-table').each(function() {

		var celltype = new Array();

		$(this).find('thead th').each(function(i) {
			if ($(this).attr('abbr') != '') {
				$(this).addClass('sorting');
				celltype[i] = $(this).attr("abbr");
			} else {
				celltype[i] = "none";
			}
		});

		sorttables[this.id] = new SortableTable(this,celltype);
	});

	// add submit behaviour to particular buttons outside form area
	$("input[id^='submit:']").each(function() {
		var id_array = this.id.split(':');
		$(this).bind('click',function() {
			if (!sjbjlform_sent) {
				$('#' + id_array[1]).submit();
			}
		});
	});

	// add reset behaviour to particular buttons outside form area
	$("input[id^='reset:']").each(function() {
		var id_array = this.id.split(':');
		$(this).bind('click',function() {
			document.getElementById(id_array[1]).reset();
		});
	});

	// add flowplayer to divs with particular class
	$(".sjbjl_player").each(function() {
		$f(this.id,{src:sjbjl_path + "images/flowplayer/flowplayer.swf",wmode:"opaque"},{
 			clip: {
				onBegin:function () {
					// make play button (re)appear
					this.getPlugin("play").css({opacity: 1});
					},
				onFinish:function () {
					// hide play again button
					this.getPlugin("play").css({opacity: 0});
				}
			},
			plugins: {
				audio: {
					url:sjbjl_path + "images/flowplayer/flowplayer.audio.swf"
				},
				controls: {
					url:sjbjl_path + "images/flowplayer/flowplayer.controls.swf",
					autoHide: "always",
					hideDelay:1000
				}
			}
		});
	});

});

function sjbjl_set_onlyedited(form_id) {
	// if submit of only edited files is enabled then disable others
	if (sjbjl_onlyedited) {
		$("#" + form_id + " input[type!='hidden'][type!='button'][disabled!='true'][disabled!='disabled'],#" + form_id + " select[disabled!='true'][disabled!='disabled'],#" + form_id + " textarea[disabled!='true'][disabled!='disabled']").each(function() {
			if (!$(this).hasClass('sjbjl_edited')) {
				$(this).addClass('sjbjl_disable_ne_nh');
				sjbjl_disable_ne_nh();
			}
		});
	}
}

// enables fields disabled for sjbjl_onlyedited submissions
function sjbjl_enable_ne_nh() {
	$('.sjbjl_disable_ne_nh').removeAttr('disabled');
	$('.sjbjl_disable_ne_nh').removeClass('sjbjl_disable_ne_nh');
}

// disables fields enabled for sjbjl_onlyedited submissions
function sjbjl_disable_ne_nh() {
	$('.sjbjl_disable_ne_nh').attr('disabled','disabled');
}

// create cache for advanced error managing
var error_fields_cache = new Array();

// add a new error entry into error_fields_cache
function efc_add(field_id,field_value,field_message) {
	var efc_index = 0;
	if (error_fields_cache.length > 0) {
		efc_index = error_fields_cache.length;
	} else {
		efc_index = 0;
	}
	error_fields_cache[efc_index] = new Array();
	error_fields_cache[efc_index]['id'] = field_id;
	error_fields_cache[efc_index]['value'] = field_value;
	error_fields_cache[efc_index]['message'] = field_message;
}

// remove an error from error_fields_cache
function efc_remove(field_id) {
	var efc_found = false;
	for (i=0; (i<error_fields_cache.length && !efc_found); i++) {
		if (error_fields_cache[i]['id'] == field_id) {
			error_fields_cache.splice(i,1);
			efc_found = true;
		}
	}
}

// truncate error_fields_cache
function efc_truncate() {
	error_fields_cache = new Array();
}

// check if error_fields_cache contains a particural field
function efc_contains(field_id) {
	var efc_found = false;
	for (i=0; (i<error_fields_cache.length && !efc_found); i++) {
		if (error_fields_cache[i]['id'] == field_id) {
			efc_found = true;
		}
	}
	return efc_found;
}

// search efc for a particular field and returns its index
function efc_find(field_id) {
	var index_found = -1;
	for (i=0; i<error_fields_cache.length; i++) {
		if (error_fields_cache[i]['id'] == field_id) {
			index_found = i;
		}
	}
	return index_found;
}

// form single field validation
function sjbjl_checkfield(obj,e,sjbjl_attributes) {

	$(obj).removeClass('blocking');

	// allowed chars section
	obj_kparguments = retrievearguments(obj,'onkeypress');
	obj_value = obj.value;

	var keypressed;
	var keycharpressed;
	var suppresskey = false;

	if (window.event) {
		keypressed = window.event.keyCode;
	} else if (e) {
		keypressed = e.which;
	}

	keycharpressed = String.fromCharCode(keypressed);

	if (isappliable(obj,'valuetype') && (validchars[obj_kparguments['valuetype']] != undefined) && (obj_kparguments['valuetype'] != 'free') && (obj_kparguments['valuetype'] != '')) {

		if ((obj_kparguments['valuetype'] == 'iban') || (obj_kparguments['valuetype'] == 'iban_italia')) {
			obj_value = obj.value.replace(/_/g,'');
			obj_value = obj_value.replace(/-/g,'');
		}

		if (!isCtrl || isAltGr) {

			if ((validchars[obj_kparguments['valuetype']].indexOf(keycharpressed) == -1)) {
				if ((keypressed!=null) && (keypressed!=0) && (keypressed!=8) && (keypressed!=9) && (keypressed!=13) && (keypressed!=27)) {
					errormessage(obj,jslang[language_code]['character_not_allowed'] + "<br /><span class='validimessage'>" + validchmsg[obj_kparguments['valuetype']] + "</span>");
					suppresskey = true;
					givefocus(obj);
				}

			} else {

				switch (obj_kparguments['valuetype']) {

					case 'money':
					case 'numeric':
					if ((obj_value.indexOf(sjbjl_decimal_separator) != -1) && (keycharpressed == sjbjl_decimal_separator)) {
						errormessage(obj,jslang[language_code]['only_one_decimal_separator_allowed']);
						suppresskey = true;
						givefocus(obj);
					}
					break;

					default:
					break;
				}
			}

			if (suppresskey) {

				try {
					e.returnValue = false;
					e.cancelBubble = true;

					if (document.all) { //IE
						e.keyCode = 0;
					} else { //NS
						e.preventDefault();
						e.stopPropagation();
					}

				} catch(ex) {

				}

			}

		}

	}

	/* maxlength section */
	maxlength = obj_kparguments['maxlength'];

	if (isappliable(obj,'maxlength') && (maxlength != -1)) {

		if ((obj_value.length >= maxlength) && (!isCtrl || isAltGr)) {

			if ((keypressed!=null) && (keypressed!=0) && (keypressed!=8) && (keypressed!=9) && (keypressed!=13) && (keypressed!=27)) {
				try {
					e.returnValue = false;
					e.cancelBubble = true;

					if (document.all) { //IE
						e.keyCode = 0;
					} else { //NS
						e.preventDefault();
						e.stopPropagation();
					}

				} catch(ex) {

				}

				if (
				($(obj).hasClass('sjbjl_date') && (obj_value.indexOf('_') != -1)) ||
				($(obj).hasClass('ipv4') && (obj_value.indexOf('_') != -1)) ||
				($(obj).hasClass('ipv6') && (obj_value.indexOf('_') != -1)) ||
				($(obj).hasClass('mac') && (obj_value.indexOf('_') != -1)) ||
				($(obj).hasClass('sjbjl_iban') && (obj_value.indexOf('_') != -1))
				) {
					// void
				} else {
					if (sjbjl_user_device != 'mobile') {
						errormessage(obj,jslang[language_code]['maxlength_reached_1'] + '<strong> ' + maxlength + ' </strong>' + jslang[language_code]['maxlength_reached_2']);
					} else {
						$(obj).attr('maxlength',maxlength);
					}
				}

			}

		}
	}

}

/* sets some html properties */
function sjbjl_setfieldproperties(nomeform) {

	/* binds automatic submit on keypress */
	$('input,select').bind('keypress',function(e) {

		var keypressed;

		if (window.event) {
			keypressed = window.event.keyCode;
		} else if (e) {
			keypressed = e.which;
		}

		if (keypressed==13) {
			automaticsubmit(this);

		}

	});

	/* sets autocomplete off to sjbjl forms */
	$('#' + nomeform).attr('autocomplete','off');

	/* attribute behaviours and properties to each field */
	var formEl = useobj(nomeform);

	var objs = formEl.elements;

	var focused = false;

	/* if form has class nofocus do not focus on first element */
	if ($('#' + nomeform).hasClass('nofocus')) {
		focused = true;
	}

	for (var i = 0; i<objs.length; i++) {

		el = objs[i];

		obj_kparguments = retrievearguments(el,'onkeypress');

		var obj_isappliablefocus = isappliable(el,'focus');

		if (isappliable(el,'mandatory') && obj_kparguments['mandatory']) {
			$(el).addClass('mandatory')
			reseterror(el);
		}

		el.onblur = function() {

			var obj_kparguments = retrievearguments(this,'onkeypress');

			if (
			(isappliable(this,'maxlength')) &&
			(obj_kparguments['maxlength'] != -1) &&
			(this.value.length > obj_kparguments['maxlength']) &&
			(obj_kparguments['valuetype'] != 'iban') &&
			(obj_kparguments['valuetype'] != 'iban_italia')
			) {
				this.value = this.value.substring(0,obj_kparguments['maxlength']);
				errormessage(this,jslang[language_code]['maxlength_reached_1'] + '<strong> ' + obj_kparguments['maxlength'] + ' </strong>' + jslang[language_code]['maxlength_reached_2']);
			}

			if (isappliable(this,'mandatory') && obj_kparguments['mandatory'] && (this.value != '')) {
				reseterror(this);
			}

			if (
			isappliable(this,'valuetype') && (
			validchars[obj_kparguments['valuetype']] != undefined) &&
			obj_kparguments['valuetype'] != 'free' &&
			obj_kparguments['valuetype'] != 'date' &&
			obj_kparguments['valuetype'] != 'iban' &&
			obj_kparguments['valuetype'] != 'iban_italia' &&
			obj_kparguments['valuetype'] != 'birthdate' &&
			obj_kparguments['valuetype'] != 'time') {
				if (sjbjl_fieldcleaner(this,obj_kparguments['valuetype'])) {
					errormessage(this,jslang[language_code]['field_clean']);
				}
			}

		}

		switch (el.type) {

			// Campi di tipo text
			case "text":
			if ((el.tabindex == undefined) && obj_isappliablefocus) {
				el.tabindex = i;
				el.setAttribute('tabindex',i);
			}

			if (obj_isappliablefocus && !focused) {
				givefocus(el);
				focused = true;
			}

			$(el).addClass('sjbjl_text');

			if (sjbjl_user_device != 'mobile') {
				if ((obj_kparguments['valuetype'] == 'date') || (obj_kparguments['valuetype'] == 'birthdate')) {
					$(el).removeClass('sjbjl_text').addClass('sjbjl_date');
					if(jQuery().mask) {
						$(el).mask("99/99/9999");
					}
				}

				if (obj_kparguments['valuetype'] == 'date') {
						$(el).datepicker({
							beforeShow: function() {
								suddenlyhideerrormessage();
							},
							changeMonth:true,
							changeYear:true,
							yearRange:'c-10:c+5',
							dateFormat:'dd/mm/yy',
							showOn:'button',
							buttonImage:sjbjl_path + 'images/icon_calendar.png',
							buttonImageOnly:true,
							buttonText:jslang[language_code]['calendar_opener_alt_text'],
							showAnim:'show' // ui effect:show, blind, clip, drop, explode, fold, puff, slide, scale, bounce, highlight, pulsate, shake, size
						});
				}

				if (obj_kparguments['valuetype'] == 'birthdate') {
					if (sjbjl_user_device != 'mobile') {
						$(el).datepicker({
							beforeShow: function() {
								suddenlyhideerrormessage();
							},
							changeMonth:true,
							changeYear:true,
							yearRange:'c-100:c',
							dateFormat:'dd/mm/yy',
							showOn:'button',
							buttonImage:sjbjl_path + 'images/icon_calendar.png',
							buttonImageOnly:true,
							buttonText:jslang[language_code]['calendar_opener_alt_text'],
							showAnim:'show' // ui effect:show, blind, clip, drop, explode, fold, puff, slide, scale, bounce, highlight, pulsate, shake, size
						});
					}
				}

				if (obj_kparguments['valuetype'] == 'birthdate') {
					$(el).datepicker("option","yearRange",'1900:c');
					$(el).datepicker("option","defaultDate",'01/01/1970');
				}

			}

			if (obj_kparguments['valuetype'] == 'ipv4') {
				if(jQuery().mask) {
					$(el).mask("999.999.999.999");
				}
			}

			if (obj_kparguments['valuetype'] == 'ipv6') {
				if(jQuery().mask) {
					$(el).mask("****:****:****:****:****:****:****:****");
				}
			}

			if (obj_kparguments['valuetype'] == 'mac') {
				if(jQuery().mask) {
					$(el).mask("**-**-**-**-**-**");
				}
			}

			if (obj_kparguments['valuetype'] == 'iban') {
				$(el).removeClass('sjbjl_text').addClass('sjbjl_iban');
				if(jQuery().mask) {
					$(el).mask("a?a-99-******************************");
				}
			}

			if (obj_kparguments['valuetype'] == 'iban_italia') {
				$(el).removeClass('sjbjl_text').addClass('sjbjl_iban');
				if(jQuery().mask) {
					$(el).mask("a?a-99-a-*****-*****-************");
				}
			}

			if (obj_kparguments['valuetype'] == 'time') {
				$(el).removeClass('sjbjl_text').addClass('sjbjl_time');
				if(jQuery().mask) {
					$(el).mask("99:99");
				}
			}

			if (obj_kparguments['valuetype'] == 'money') {
				$(el).removeClass('sjbjl_text').addClass('sjbjl_money');
			}

			break;

			// Textarea e password
			case "textarea":
			case "password":

			if ((el.tabindex == undefined) && obj_isappliablefocus) {
				el.tabindex = i;
				el.setAttribute('tabindex',i);
			}

			if (obj_isappliablefocus && !focused) {
				givefocus(el);
				focused = true;
			}
			break;

			// Select
			case "select-one":
			if ((el.tabindex == undefined) && obj_isappliablefocus) {
				el.tabindex = i;
				el.setAttribute('tabindex',i);
			}

			if (obj_isappliablefocus && !focused) {
				givefocus(el);
				focused = true;
			}
			break;

			// Campi nascosti
			case "hidden":
			break;

			// Radio button e checkbox
			case "radio":
			case "checkbox":
			if ((el.tabindex == undefined) && obj_isappliablefocus) {
				el.tabindex = i;
				el.setAttribute('tabindex',i);
			}
			if (el.checked) {
				/*Eventualmente definire una azione*/
			}
			if (obj_isappliablefocus && !focused) {
				givefocus(el);
				focused = true;
			}
			break;

			// Pulsanti, submit e reset
			case "button":
			case "submit":
			if ((el.tabindex == undefined) && obj_isappliablefocus) {
				el.tabindex = i;
				el.setAttribute('tabindex',i);
			}
			break;

		}

		if (isreadonly(el)) {
			$(el).addClass('readonly');
		}
	}

	return false;
}

function sjbjl_checkform(nomeform) {

	var formEl = useobj(nomeform);
	var objs;
	var isForm = false;

	if (formEl.nodeName == 'FORM') { 
		objs = formEl.elements;
		isForm = true;
	} else {
		objs = $('#' + nomeform + ' input,#' + nomeform + ' select,#' + nomeform + ' textarea');
	}

	for (var i = 0; i<objs.length; i++) {

		el = objs[i];

		if ((el.nodeName != 'FIELDSET') && (el.type != 'submit') && (el.type != 'button')) {

			obj_kparguments = retrievearguments(el,'onkeypress');

			objvaluetype = obj_kparguments['valuetype'];
			objlabel = obj_kparguments['label'];
			minlength = obj_kparguments['minlength'];
			min_value = parseInt(obj_kparguments['minval']);
			max_value = parseInt(obj_kparguments['maxval']);
			strict_min_value = parseInt(obj_kparguments['strict_minval']);
			strict_max_value = parseInt(obj_kparguments['strict_maxval']);
			multiple_of = parseInt(obj_kparguments['multipleof']);

			obj_value = el.value;

			if ((objvaluetype == 'iban') || (objvaluetype == 'iban_italia')) {
				obj_value = el.value.replace(/_/g,'');
				obj_value = obj_value.replace(/-/g,'');
			}

			var obj_isdisabled = isdisabled(el);

			if (!obj_isdisabled && (el.type != 'select-one')) {

				/* if is mandatory and empty or checkbox */
				if ((ismandatory(el) && (obj_value == '')) || (ismandatory(el) && (el.type == 'checkbox') && (!el.checked)) || (ismandatory(el) && (el.type == 'radio') && ($("input[name='" + el.name + "']:checked").val() == undefined))) {
					seterror(el);
					errormessage(el,jslang[language_code]['mandatory_field_1'] + '<strong> ' + objlabel + ' </strong>' + jslang[language_code]['mandatory_field_2']);
					return false;
				/* if not reached minlength */
				} else if ((obj_value != undefined) && (obj_value != '') && !isNaN(minlength) && (obj_value.length < minlength)) {
					seterror(el);
					errormessage(el,jslang[language_code]['minlength_required_1'] + '<strong> ' + minlength + ' </strong>' + jslang[language_code]['minlength_required_2']);
					return false;
				} else {
					reseterror(el);
				}

			/* if is not disabled, have keypress attr and is a select */
			} else if (!obj_isdisabled && (el.type == 'select-one')) {
				/* if is mandatory and empty */
				if (ismandatory(el) && (obj_value == '')) {
					seterror(el);
					errormessage(el,jslang[language_code]['mandatory_field_1'] + '<strong> ' + objlabel + ' </strong>' + jslang[language_code]['mandatory_field_2']);
					return false;

				/* otherwise */
				} else {
					reseterror(el);
				}

			/* otherwise */
			} else {
				reseterror(el);
			}

			switch (el.type) {

				case "text":
				case "textarea":

				/* date data type */
				if ($(el).hasClass('sjbjl_date')) {

					y = obj_value;
					m = /^([0-9]{1,2})[\/]([0-9]{1,2})[\/]([0-9]{1,4})$/;
					d = {d:1, m:2, y:3};

					var result = 0;

					if (y != '') {

						if (typeof y == 'string' && m instanceof RegExp && d) {
							if (!m.test(y)) {
								seterror(el);
								errormessage(el,jslang[language_code]['dataerrormessage1']);
								return false;
							}
							y = RegExp["$" + d.y], m = RegExp["$" + d.m], d = RegExp["$" + d.d];
						}
						d = Math.abs(d) || 0, m = Math.abs(m) || 0, y = Math.abs(y) || 0;
						result = d < 1 || d > 31 ? 2 :m < 1 || m > 12 ? 3 :/4|6|9|11/.test(m) && d == 31 ? 4
						 :m == 2 && (d > ((y = !(y % 4) && (y % 1e2) || !(y % 4e2)) ? 29 :28)) ? 5 + !!y :0;
						if (result != 0) {
							seterror(el);
							errormessage(el,jslang[language_code]['dataerrormessage' + result]);
							return false;
						}

					}

				}

				/* time data type */
				if ($(el).hasClass('sjbjl_time')) {

					y = obj_value;
					m = /^([0-9]{1,2})[\:]([0-9]{1,2})$/;
					d = {h:1, m:2};

					if (y != '') {

						var validtime = true;

						if (typeof y == 'string' && m instanceof RegExp && d) {
							if (!m.test(y)) {
								errormessage(el,jslang[language_code]['timeerrormessages1']);
								return false;
							}
							h = RegExp["$" + d.h], m = RegExp["$" + d.m];
						}

						h = Math.abs(h) || 0, m = Math.abs(m) || 0;

						timeerrormessage = '';

						if ((h<0) || (h>23)) {
							validtime = false;
							timeerrormessage += jslang[language_code]['timeerrormessages2'] + '<br />';
						}
						if ((m<0) || (m>59)) {
							validtime = false;
							timeerrormessage += jslang[language_code]['timeerrormessages3'];
						}

						if (!validtime) {
							seterror(el);
							errormessage(el,timeerrormessage);
							return false;
						}

					}
				}

				/* valuetype evaluation */
				switch (objvaluetype) {

					case 'integer':
						parsed_value = parseFloat(obj_value);
						
						if ((min_value != -1) && (parsed_value < min_value)) {
							seterror(el);
							errormessage(el,jslang[language_code]['minvalmessage'] + '<strong>' + min_value + '</strong>');
							return false;
						}

						if ((strict_min_value != -1) && (parsed_value <= strict_min_value)) {
							seterror(el);
							errormessage(el,jslang[language_code]['strict_minvalmessage'] + '<strong>' + strict_min_value + '</strong>');
							return false;
						}

						if ((max_value != -1) && (parsed_value > max_value)) {
							seterror(el);
							errormessage(el,jslang[language_code]['maxvalmessage'] + '<strong>' + max_value + '</strong>');
							return false;
						}

						if ((strict_max_value != -1) && (parsed_value >= strict_max_value)) {
							seterror(el);
							errormessage(el,jslang[language_code]['strict_maxvalmessage'] + '<strong>' + strict_max_value + '</strong>');
							return false;
						}

						if ((multiple_of != -1) && ((parsed_value % multiple_of) != 0)) {
							seterror(el);
							errormessage(el,jslang[language_code]['multipleofmessage'] + '<strong>' + multiple_of + '</strong>');
							return false;
						}
						
					break;

					
					case 'numeric':
					case 'money':

					mv = obj_value;
					if (mv != '') {

						commanum = mv.split(sjbjl_decimal_separator).length-1;

						if (commanum > 1) {
							errormessage(el,jslang[language_code]['erroremoney1']);
							return false;
						}

						if (mv.indexOf(sjbjl_decimal_separator) != -1) {
							mv_parts = mv.split(sjbjl_decimal_separator);
							if (mv_parts[1].length > 2) {
								errormessage(el,jslang[language_code]['erroremoney2']);
								return false;
							}
						}
					}

					parsed_value = parseFloat(obj_value.replace(sjbjl_decimal_separator,'.'));

					if ((min_value != -1) && (parsed_value < min_value)) {
						seterror(el);
						errormessage(el,jslang[language_code]['minvalmessage'] + '<strong>' + min_value + '</strong>');
						return false;
					}

					if ((strict_min_value != -1) && (parsed_value <= strict_min_value)) {
						seterror(el);
						errormessage(el,jslang[language_code]['strict_minvalmessage'] + '<strong>' + strict_min_value + '</strong>');
						return false;
					}

					if ((max_value != -1) && (parsed_value > max_value)) {
						seterror(el);
						errormessage(el,jslang[language_code]['maxvalmessage'] + '<strong>' + max_value + '</strong>');
						return false;
					}

					if ((strict_max_value != -1) && (parsed_value >= strict_max_value)) {
						seterror(el);
						errormessage(el,jslang[language_code]['strict_maxvalmessage'] + '<strong>' + strict_max_value + '</strong>');
						return false;
					}

					if ((multiple_of != -1) && ((parsed_value % multiple_of) != 0)) {
						seterror(el);
						errormessage(el,jslang[language_code]['multipleofmessage'] + '<strong>' + multiple_of + '</strong>');
						return false;
					}
					break;

					case 'email':
					case 'bei':
					case 'bic':
					case 'ibei':
					case 'uschu':
					case 'cuc':
					case 'nt35':
					case 'url':
					case 'ipv4':
					case 'ipv6':
					case 'mac':
					var string_to_test = obj_value;

					if (string_to_test != '') {
						var regex_array = string_to_test.match(validregex[objvaluetype]);
						if ((regex_array == null) || ((regex_array != null) && (string_to_test != regex_array[0]))) {
							seterror(el);
							var msgtoshow = jslang[language_code]['regexp_failed_1'] + objlabel + jslang[language_code]['regexp_failed_2'];
							if (validsamp[objvaluetype] != undefined) {
								msgtoshow += jslang[language_code]['some_samples'] + "<strong>" + validsamp[objvaluetype] + "</strong>";
							}
							errormessage(el,msgtoshow);
							return false;
						}
					}

					break;

					case 'iban':
					case 'iban_italia':
					var string_to_test = obj_value;
					if (string_to_test != '') {
						var regex_array = string_to_test.match(validregex[objvaluetype]);
						if ((regex_array == null) || ((regex_array != null) && (string_to_test != regex_array[0]))) {
							seterror(el);
							var msgtoshow = jslang[language_code]['regexp_failed_1'] + objlabel + jslang[language_code]['regexp_failed_2'];
							if (validsamp[objvaluetype] != undefined) {
								msgtoshow += jslang[language_code]['some_samples'] + "<strong>" + validsamp[objvaluetype] + "</strong>";
							}
							errormessage(el,msgtoshow);
							return false;
						} else {
							// verifica coerenza iban
							// EPOS
							iban2="";
							tabella="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

							stati=new Array("Andorra","ADkkBBBBbbbbCCCCCCCCCCCC",
							"Austria","ATkkBBBBBCCCCCCCCCCC",
							"Belgio","BEkkBBBCCCCCCCKK",
							"Bosnia e Herzegovina","BAkkBBBbbbCCCCCCCCKK",
							"Bulgaria","BGkkSSSSbbbbCCCCCCCCCC",
							"Cipro", "BBBbbbbbCCCCCCCCCCCCCCCC",
							"Croazia","HRkkBBBBBBBCCCCCCCCCC",
							"Repubblica Ceca","CZkkBBBBCCCCCCCCCCCCCCCC",
							"Danimarca", "DKkkBBBBCCCCCCCCCK",
							"Estonia", "EEkkBBBBCCCCCCCCCCCK",
							"Finlandia", "FIkkBBBBBBCCCCCCCK",
							"Francia", "FRkkBBBBBbbbbbCCCCCCCCCCCKK",
							"Germania","DEkkBBBBBBBBCCCCCCCCCC",
							"Gibilterra","GIkkBBBBCCCCCCCCCCCCCCC",
							"Gran Bretagna","GBkkSSSSbbbbbbCCCCCCCC",
							"Grecia", "GRkkBBBbbbbCCCCCCCCCCCCCCCC",
							"Groenlandia", "GLkkBBBBCCCCCCCCCK",
							"Irlanda", "IEkkSSSSbbbbbbCCCCCCCC",
							"Islanda", "ISkkBBBBCCCCCCCCXXXXXXXXXX",
							"Isole Faroe","FOkkBBBBCCCCCCCCCK",
							"Italia", "ITkkKBBBBBbbbbbCCCCCCCCCCCC",
							"Lettonia", "LVkkBBBBCCCCCCCCCCCCC",
							"Liechtenstein", "LIkkBBBBBCCCCCCCCCCCC",
							"Lituania", "LTkkBBBBBCCCCCCCCCCC",
							"Lussemburgo", "LUkkBBBCCCCCCCCCCCCC",
							"Macedonia", "MKkkBBBCCCCCCCCCCKK",
							"Malta", "MTkkBBBBbbbbbCCCCCCCCCCCCCCCCCC",
							"Mauritius", "MUkkBBBBBBbbCCCCCCCCCCCCRRRddd",
							"Monaco","MCkkBBBBBbbbbbCCCCCCCCCCCKK",
							"Norvegia","NOkkBBBBCCCCCCK",
							"Paesi Bassi","NLkkBBBBCCCCCCCCCC",
							"Polonia","PLkkBBBBBBBBCCCCCCCCCCCCCCCC",
							"Portogallo","PTkkBBBBbbbbCCCCCCCCCCCKK",
							"Romania","ROkkSSSSCCCCCCCCCCCCCCCC",
							"San Marino","SMkkKBBBBBbbbbbCCCCCCCCCCCC",
							"Serbia e Montenegro","CSkkBBBCCCCCCCCCCCCCKK",
							"Slovacchia","SKkkBBBBCCCCCCCCCCCCCCCC",
							"Slovenia","SIkkBBBBBCCCCCCCCCCCCKK",
							"Spagna","ESkkBBBBbbbbKKCCCCCCCCCC",
							"Svezia", "SEkkBBBCCCCCCCCCCCCCCCCK",
							"Svizzera","CHkkBBBBBCCCCCCCCCCCC",
							"Tunisia","TNkkBBbbbCCCCCCCCCCCCCKK",
							"Turchia","TRkkBBBBBRCCCCCCCCCCCCCCCC",
							"Ungheria","HUkkBBBbbbbKCCCCCCCCCCCCCCCK");

							a=string_to_test;
							a=a.toUpperCase();
							a=a.replace(/ /g,"");
							lunghezza = a.length;
							nazione = a.substr(0,2);

							conta=1;
							lungnaz=0;
							nomestato="";

							for (prop=0; prop<stati.length; prop++) {

								if (conta%2==0) {
									e=stati[prop];
									nomestato=stati[conta-2];
									cod=e.substr(0,2);

									if (cod==nazione) {
										abi="";
										cab="";
										cc="";
										conta2=0;

										for (pro=0; pro<e.length; pro++) {
											if (e.charAt(pro)=="C" && conta2>3) {
												cc=cc+a.charAt(conta2);
											}
											if (e.charAt(pro)=="b" && conta2>3) {
												cab=cab+a.charAt(conta2);
											}
											if ((e.charAt(pro)=="B" || e.charAt(pro)=="S") && conta2>3) {
												abi=abi+a.charAt(conta2);
											}
											conta2++;
										}

										lungnaz=e.length;
										break;
									}

								}
								conta++;

							}

							if (lungnaz == 0) {
								errormessage(el,jslang[language_code]['iban_codicenazione_1'] + "<strong>" + nazione + "</strong>" + jslang[language_code]['iban_codicenazione_2']); // epos
								return false;
							}

							if (lungnaz != lunghezza) {
								errormessage(el,jslang[language_code]['iban_lunghezza_1'] + "<strong>" + nomestato + "</strong>" + jslang[language_code]['iban_lunghezza_2'] + lungnaz + "<br />" + jslang[language_code]['iban_lunghezza_3'] + lunghezza + "."); // epos
								return false;
							}

							controllo = a.substr(2,2);

							if (nazione == "IT") {
								cin = a.substr(4,1);
								cincal = sjbjl_check_cin(abi+cab+cc);
								cc1 = cincal+abi+cab+cc+"IT"+"00";
							} else {
								cc1 = a.substr(4,lunghezza-4)+nazione+"00";
							}

							for (var iban1=0;iban1<cc1.length;iban1++) {
								iban2+=tabella.indexOf(cc1.charAt(iban1));
							}
							divisore=97;
							div1="";
							for (var ciclo1 = 0; ciclo1 < iban2.length; ciclo1++) {
								div1=div1+iban2.charAt(ciclo1);
								if (div1<divisore) {
									continue;
								} else {
									div1=div1%divisore;
								}
							}

							iban2=98 - div1;
							iban2="0"+iban2;
							iban2=iban2.charAt(iban2.length-2)+iban2.charAt(iban2.length-1);

							if ((iban2 != controllo && cin != cincal && nazione == "IT") || (iban2 != controllo && nazione != "IT")) {
								errormessage(el,jslang[language_code]['iban_cin_e_codicecontrollo']);
								return false;
							} else {
								if (nazione == "IT") {
									if (cin != cincal) {
										errormessage(el,jslang[language_code]['iban_cin_1'] + "<strong>" + cin + "</strong>" + jslang[language_code]['iban_cin_2'] + "<strong>" + cincal + "</strong>."); // epos
										return false;
									}
								}

								if (iban2 != controllo) {
									errormessage(el,jslang[language_code]['iban_codicecontrollo_1'] + "<strong>" + controllo + "</strong>" + jslang[language_code]['iban_codicecontrollo_2'] + "<strong>" + iban2 + "</strong>.");
									return false;
								}
							}
						}
					}
					break;

					/* fiscal code */
					case 'codice_fiscale':
					var i,s,set1,set2,setpari,setdisp;

					cf = obj_value.toUpperCase();

					if ((cf != '') && (cf != undefined)) {

						set1 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
						set2 = "ABCDEFGHIJABCDEFGHIJKLMNOPQRSTUVWXYZ";
						setpari = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
						setdisp = "BAKPLCQDREVOSFTGUHMINJWZYX";

						s = 0;
						for (var codchar = 1; codchar <= 13; codchar += 2) {
							s += setpari.indexOf(set2.charAt(set1.indexOf(cf.charAt(codchar))));
						}
						for (var codchar = 0; codchar <= 14; codchar += 2) {
							s += setdisp.indexOf( set2.charAt( set1.indexOf(cf.charAt(codchar))));
						}
						if (s%26 != cf.charCodeAt(15)-'A'.charCodeAt(0)) {
							errormessage(el,jslang[language_code]['errorecodicefiscale']);
							return false;
						}
					}
					break;

					/* vat tax */
					case 'partita_iva':
					pi = obj_value.toUpperCase();

					if ((pi != '') && (pi != undefined)) {

						s = 0;
						for (var codchar = 0; codchar <= 9; codchar += 2) {
							s += pi.charCodeAt(codchar) - '0'.charCodeAt(0);
						}
						for (var codchar = 1; codchar <= 9; codchar += 2) {
							c = 2*(pi.charCodeAt(codchar) - '0'.charCodeAt(0));
							if (c > 9) {c = c - 9;}
							s += c;
						}
						if ((10 - s%10)%10 != pi.charCodeAt(10) - '0'.charCodeAt(0)) {
							errormessage(el,jslang[language_code]['errorepartitaiva']);
							return false;
						}

					}
					break;

					default:
					break;

				}
				break;

				case "select-one":
				break;

				case "radio":
				case "checkbox":
				if (el.checked) {
					//
				}
				break;
			}

			if (efc_contains(el.id)) {

				if ((objvaluetype == 'iban') || (objvaluetype == 'iban_italia')) {
					obj_value = obj_value.replace(/[_-]/g,'');
				}

				if (obj_value == error_fields_cache[efc_find(el.id)]['value']) {
					errormessage(el,error_fields_cache[efc_find(el.id)]['message']);
					return false;
				} else {
					efc_remove(el.id);
				}
			}

			if ($(el).hasClass('blockingerror')) {
				seterror(el);
				errormessage(el,jslang[language_code]['errortipmessage']);
				return false;
			}
		}
	}

	if (isForm) {

		var sendform_physically  = false;

		// if form has not been sent
		if (!sjbjlform_sent) {

			// if exists an extension to checkform demand to it the final validation
			if (typeof(checkform_extend) == 'function') {

			// if the extension returns true then proceed
				if (checkform_extend()) {
					sjbjl_set_onlyedited(nomeform);
					sjbjlform_sent = true;
					sendform_physically = true;
				} else {
					sjbjlform_sent = false;
					sendform_physically = false;
				}

			// if extension doesn't exist
			} else {
				sjbjl_set_onlyedited(nomeform);
				sjbjlform_sent = true;
				sendform_physically = true;
			}

		// if form has already been sent, then lock further actions
		} else {
			sendform_physically = false;
		}

		// if we are in pure ajax context then allows further actions
		if (sjbjl_pureajax) {
			sjbjl_enable_ne_nh();
			sjbjlform_sent = false;
		}

		return sendform_physically;

	} else {
		return true;
	}
	/*EPOS CUCCO*/
}

/* ERRORS */

/* set error state to field and show error message */
function seterror(object,show_default_message) {
	if ((show_default_message != undefined) && (show_default_message == true)) {
		errormessage(object,jslang[language_code]['errortipmessage']);
	}
	$(object).addClass("seterror");
}

/* reset normal state to field */
function reseterror(object) {
	$(object).removeClass("seterror");
}

/* shows error message */
var hideerrormessage_timer = '';

function errormessage(targetobj,string,autohide) {

	$(targetobj).closest("div.hidden[id$='_content']").show('slow');

	if (string != '') {

		switch (sjbjl_user_device) {

			case 'mobile':
			givefocus(targetobj);
			$(window).scrollTop($(targetobj).position().top - 100);
			string = string.replace(/(<([^>]+)>)/ig,"");
			setTimeout(function() {
				alert(string);
			},100);
			break;

			default:
			case 'desktop':
			if (hideerrormessage_timer != '') {
				window.clearTimeout(hideerrormessage_timer);
				hideerrormessage_timer = '';
			}

			var msg;
			var msgcontent;
			if (!document.getElementById('errormsg')) {
				msg = document.createElement('div');
				msg.id = 'errormsg';
				msgcontent = document.createElement('div');
				msgcontent.id = 'errormsgcontent';
				document.body.appendChild(msg);
				msg.appendChild(msgcontent);
			} else {
				msg = document.getElementById('errormsg');
				msgcontent = document.getElementById('errormsgcontent');
			}

			$('#errormsgcontent').html(string);

			var msgheight = msg.offsetHeight;

			givefocus(targetobj);

			var targetheight = targetobj.offsetHeight;
			var targetwidth = targetobj.offsetWidth;
			var topposition = topPosition(targetobj) + targetheight + 4;
			var leftposition = leftPosition(targetobj);
			msg.style.top = topposition + 'px';
			msg.style.left = leftposition + 'px';
			msgcontent.style.backgroundColor = sjbjl_errorbgcolor;
			msgcontent.style.borderColor = sjbjl_errorbgcolor;
			$(msg).fadeIn();

			if (!autohide) {
				autohide = errormsghide;
			}

			hideerrormessage_timer = window.setTimeout("hideerrormessage()", autohide);
			break;

		}
	}
}

/* hides error message */
function hideerrormessage() {
	var message = document.getElementById('errormsg');
	$(message).fadeOut('slow');
}

/* suddenly hides error message */
function suddenlyhideerrormessage() {
	$('#errormsg').hide();
}

/* GLOBAL SJBJL LIBRARIES */

/* check if a field is an object or not */
function isobj(id) {
	if (document.getElementById(id) != undefined) {
		return true;
	} else {
		return false;
	}
}

/* check if a field is disabled or not */
function isdisabled(obj) {
	if (!document.getElementById(obj)) {
		var objtocheck = obj;
	} else {
		var objtocheck = document.getElementById(obj);
	}
	if (($(objtocheck).hasClass('disabled')) || (objtocheck.disabled == 'disabled') || (objtocheck.disabled == 'true') || (objtocheck.disabled == true)) {
		return true;
	} else {
		return false;
	}
}

/* check if a field is readonly or not */
function isreadonly(objid) {
	if (!document.getElementById(objid)) {
		var objtocheck = objid;
	} else {
		var objtocheck = document.getElementById(objid);
	}
	if ((objtocheck.readOnly == 'readonly') || (objtocheck.readOnly == 'true') || (objtocheck.readOnly == true)) {
		return true;
	} else {
		return false;
	}
}

/* check if a field is of hidden type or not */
function ishidden(objid) {
	if (!document.getElementById(objid)) {
		var objtocheck = objid;
	} else {
		var objtocheck = document.getElementById(objid);
	}
	if (objtocheck.type == 'hidden') {
		return true;
	} else {
		return false;
	}
}

/* check if a field is (css) displayed or not */
function isdisplayed(objid) {
	if (!document.getElementById(objid)) {
		var objtocheck = objid;
	} else {
		var objtocheck = document.getElementById(objid);
	}

	if ($(objtocheck).is(':visible')) {
		return true;
	} else {
		return false;
	}
}

/* check if a field is mandatory or not */
function ismandatory(objid) {

	if (!document.getElementById(objid)) {
		var objtocheck = objid;
	} else {
		var objtocheck = document.getElementById(objid);
	}

	var mandatory = false;

	if ($(objtocheck).hasClass('mandatory_true')) {

		return true;

	} else if ($(objtocheck).hasClass('mandatory_false')) {

		return false;

	} else {

		mandatory = retrievearguments(objid,'onkeypress')['mandatory'];

		switch (mandatory) {
			case true:
			return true;
			break;

			case false:
			return false;
			break;

			default:
			return false;
			break;
		}

	}

}

function isappliable(obj,whattoapply) {

	if ((obj != undefined) && (obj.id != '') && (obj.type != undefined)) {

		if (!document.getElementById(obj)) {
			var objtocheck = obj;
		} else {
			var objtocheck = document.getElementById(obj);
		}

		var obj_isreadonly = isreadonly(objtocheck);
		var obj_isdisabled = isdisabled(objtocheck);
		var obj_ishidden = ishidden(objtocheck);
		var obj_isdisplayed = isdisplayed(objtocheck);

		switch (whattoapply.toLowerCase()) {

			case 'focus':
			if (!obj_isreadonly && !obj_isdisabled && !obj_ishidden && obj_isdisplayed) {

				switch (objtocheck.type.toLowerCase()) {
					case 'fieldset':
					return false;
					break;

					default:

					return true;
					break;
				}

			} else {
				return false;
			}
			break;

			case 'maxlength':
			if (!obj_isreadonly && !obj_isdisabled && !obj_ishidden && obj_isdisplayed) {

				switch (objtocheck.type) {
					case 'fieldset':
					case 'select-one':
					case 'button':
					case 'submit':
					case 'radio':
					case 'checkbox':
					return false;
					break;

					default:
					if ($(objtocheck).hasClass('sjbjl_date')) {
						return false;
					} else {
						return true;
					}
					break;
				}
			} else {
				return false;
			}
			break;

			case 'valuetype':
			if (!obj_isreadonly && !obj_isdisabled && !obj_ishidden && obj_isdisplayed) {
				switch (objtocheck.type) {
					case 'select-one':
					case 'button':
					case 'submit':
					case 'radio':
					case 'checkbox':
					return false;
					break;

					default:
					return true;
					break;
				}

			} else {
				return false;
			}
			break;

			case 'mandatory':
			if (!obj_isreadonly && !obj_isdisabled && !obj_ishidden) {
				switch (objtocheck.type) {
					case 'button':
					case 'submit':
					return false;
					break;

					default:
					if (objtocheck.nodeName.toLowerCase() == 'fieldset') {
						return false;
					} else {
						return true;
					}
					break;
				}
			} else {
				return false;
			}
			break;

			default:
			break;
		}

	} else {
		return false;
	}

}

/* returns the object that has objid id */
function useobj(objid) {
	if (isobj(objid)) {
		return document.getElementById(objid);
	}
}

/* trims initial and trailing whitespaces */
function trim(stringa) {
	while (stringa.substring(0,1) == ' ') {
		stringa = stringa.substring(1, stringa.length);
	}
	while (stringa.substring(stringa.length-1, stringa.length) == ' ') {
		stringa = stringa.substring(0,stringa.length-1);
	}
	return stringa;
}

/* prototype functions that create count functions in a string */
String.prototype.count = function(s1) {
	if (s1 == '.') {
		var newregexp = /\./;
	} else {
		var newregexp = new RegExp(s1,"g");
	}
	return (this.length - this.replace(newregexp, '').length) / s1.length;
}

/* logs out web application */
function logout() {
	$('#formlogout').submit();
}

/* automatically submits the form containing a field */
function automaticsubmit(obj) {
	if (!sjbjlform_sent) {
		$(obj).closest('form').submit();
	}
}

/* calculate the left position of a target */
function leftPosition(target) {
	var left = 0;
	if (target.offsetParent) {
		while(1) {
			left += target.offsetLeft;
			if (!target.offsetParent) {
				break;
			}
			target = target.offsetParent;
		}
	} else if (target.x) {
		left += target.x;
	}
	return left;
}

/* calculate the top position of a target */
function topPosition(target) {
	var top = 0;
	if (target.offsetParent) {
		while(1) {
			top += target.offsetTop;
			if (!target.offsetParent) {
				break;
			}
			target = target.offsetParent;
		}
	} else if (target.y) {
		top += target.y;
	}
	top -= 2;
	return top;
}

/* retrieve field validation arguments from onkeypress event */
function retrievearguments(obj,event) {

	validator = new Array();
	validator['minlength'] = -1;
	validator['maxlength'] = -1;
	validator['mandatory'] = false;
	validator['valuetype'] = 'free';
	validator['label'] = 'LABEL MANCANTE';

	validator['minval'] = -1;
	validator['maxval'] = -1;
	validator['strict_minval'] = -1;
	validator['strict_maxval'] = -1;
	validator['multipleof'] = -1;

 	if ((obj.getAttribute(event) != undefined) && (obj.getAttribute(event) != null)) {

		var row_validators = "";
		var row_singlevalidator = new Array();

		row_validators = obj.getAttribute(event);
		row_validators = row_validators.toString();
		row_validators = row_validators.replace(/'/g,"");

		var regularexpr = new RegExp("sjbjl_checkfield\\(this,event,(.+)\\)", "g");
		matcharray = regularexpr.exec(row_validators);
		row_validators = matcharray[1];

		row_validators = row_validators.replace('minl','minlength');
		row_validators = row_validators.replace('maxl','maxlength');

		validator_array = row_validators.split(',');

		for (i=0; i<validator_array.length; i++) {
			row_singlevalidator[i] = validator_array[i].split('=');
			validator[row_singlevalidator[i][0]] = row_singlevalidator[i][1];
		}

		switch (validator['mandatory']) {
			case 'true':
			case 'mandatory':
			validator['mandatory'] = true;
			break;

			case 'false':
			case 'optional':
			validator['mandatory'] = false;
			break;

			default:
			break;
		}

		validator['maxval'] = parseInt(validator['maxval']);
		validator['strict_minval'] = parseInt(validator['strict_minval']);
		validator['strict_maxval'] = parseInt(validator['strict_maxval']);
		validator['multipleof'] = parseInt(validator['multipleof']);

		/* minval */
		var minval_pattern = /minval_[0-9]+_set/gi;
		minval_array = el.className.match(minval_pattern);
		if (minval_array != null) {
			minval = minval[0].replace('minval_','');
			minval = minval.replace('_set','');
			validator['minval'] = trim(minval);
		} else {
			validator['minval'] = parseInt(validator['minval']);
		}

		/* minlength */
		var minlength_pattern = /minlength_[0-9]+_set/gi;
		minlength_array = el.className.match(minlength_pattern);
		if (minlength_array != null) {
			minlength = minlength_array[0].replace('minlength_','');
			minlength = minlength.replace('_set','');
			validator['minlength'] = trim(minlength);
		} else {
			validator['minlength'] = parseInt(validator['minlength']);
		}

		/* maxlength */
		var maxlength_pattern = /maxlength_[0-9]+_set/gi;
		maxlength_array = obj.className.match(maxlength_pattern);

		if (maxlength_array != null) {
			maxlength = maxlength_array[0].replace('maxlength_','');
			maxlength = maxlength.replace('_set','');
			validator['maxlength'] = trim(maxlength);
		} else {
			validator['maxlength'] = parseInt(validator['maxlength']);
		}

		/* valuetype */
		var objvaluetype_pattern = /valuetype_[a-zA-Z0-9_]+_set/gi;
		objvaluetype_array = obj.className.match(objvaluetype_pattern);

		if (objvaluetype_array != null) {
			objvaluetype = objvaluetype_array[0].replace('valuetype_','');
			objvaluetype = objvaluetype.replace('_set','');
			validator['valuetype'] = trim(objvaluetype);
		}

		if (validminl[validator['valuetype']] != undefined) {
			validator['minlength'] = validminl[validator['valuetype']];
		}

		if (validmaxl[validator['valuetype']] != undefined) {
			validator['maxlength'] = validmaxl[validator['valuetype']];
		}

	} else {
		if ($(obj).hasClass('mandatory_true')) {
			validator['mandatory'] = true;
		} else if ($(obj).hasClass('mandatory_false')) {
			validator['mandatory'] = false;
		} else {
			validator['mandatory'] = false;
		}
		validator['label'] = obj.name;
	}
	return validator;
}

/* sjbjl redirection */
function sjbjlredirect(page) {
	if (page != "") {
		document.location = page;
	}
}

/* give focus to an obj wheter it is in a tabbed fieldset or not */
function givefocus(obj) {

	whichtab = '';
	whichtabcontainer = '';
	/* if form has class nofocus do not focus on first element */
	whichtab = $(obj).closest('.ui-tabs-panel');
	whichtabcontainer = $(obj).closest('.ui-tabs');

	$(whichtabcontainer).tabs('select', '#' + $(whichtab).attr('id'));

	if ((($(whichtab).length > 0) && $(whichtab).is(':visible')) || ($(whichtab).length == 0)) {
		obj.focus();
	}

	return;
}

/* set a field as mandatory and back */
function setmandatory(obj,statustoset) {

	var obj_array = new Array();

	if (typeof(obj) == 'object') {
		obj_array[0] = obj;
	} else {
		obj_array = obj.split(',');
	}

	for (i=0; i<obj_array.length; i++) {

		if (!document.getElementById(obj_array[i])) {
			var objtocheck = obj_array[i];
		} else {
			var objtocheck = document.getElementById(obj_array[i]);
		}

		switch (statustoset) {
			case true:
			case 'true':
			case 'mandatory':
			$(objtocheck).addClass('mandatory_true').removeClass('mandatory_false');
			$(objtocheck).removeClass('mandatory');
			break;

			case false:
			case 'false':
			case 'optional':
			$(objtocheck).removeClass('mandatory_true').addClass('mandatory_false');
			$(objtocheck).removeClass('mandatory');
			break;
		}
	}
}

/* set valuetype of a field as required */
function setvaluetype(obj,valuetypetoset) {

	if (!document.getElementById(obj)) {
		var objtocheck = obj;
	} else {
		var objtocheck = document.getElementById(obj);
	}

	if (valuetypetoset != undefined) {
		objtocheck.className = objtocheck.className.replace(/valuetype_.+_set/gi,'');
		$('#' + objtocheck.id).addClass('valuetype_' + valuetypetoset + '_set');
		sjbjl_fieldcleaner(objtocheck,valuetypetoset);
	}

}

/* set maxlength of a field as required */
function setmaxlength(obj,lengthtoset) {
	if (!document.getElementById(obj)) {
		var objtocheck = obj;
	} else {
		var objtocheck = document.getElementById(obj);
	}

	if ((lengthtoset != undefined) || (!isNaN(lengthtoset))) {
		objtocheck.className = objtocheck.className.replace(/maxlength_\d_set/gi,'');
		$(objtocheck).addClass('maxlength_' + lengthtoset + '_set');
	}

	if (objtocheck.value.length > lengthtoset) {
		objtocheck.value = objtocheck.value.substring(0,lengthtoset);
		errormessage(objtocheck,jslang[language_code]['new_maxlength_reached_1'] + '<strong> ' + lengthtoset + ' </strong>' + jslang[language_code]['new_maxlength_reached_2']);
	}

}

/* set maxlength of a field as required */
function setminlength(obj,lengthtoset) {

	if (!document.getElementById(obj)) {
		var objtocheck = obj;
	} else {
		var objtocheck = document.getElementById(obj);
	}

	if ((lengthtoset != undefined) || (!isNaN(lengthtoset))) {
		objtocheck.className = objtocheck.className.replace(/minlength_\d+_set/gi,'');
		$(objtocheck).addClass('minlength_' + lengthtoset + '_set');
	}

	errormessage(objtocheck,jslang[language_code]['new_minlength_set_1'] + '<strong> ' + lengthtoset + ' </strong>' + jslang[language_code]['new_minlength_set_2']);

}

/* set minval of a field as required */
function setminval(obj,minvaltoset) {

	if (!document.getElementById(obj)) {
		var objtocheck = obj;
	} else {
		var objtocheck = document.getElementById(obj);
	}

	if ((minvaltoset != undefined) || (!isNaN(minvaltoset))) {
		objtocheck.className = objtocheck.className.replace(/minval_\d+_set/gi,'');
		$(objtocheck).addClass('minval_' + minvaltoset + '_set');
	}

	if (objtocheck.value < minvaltoset) {
		objtocheck.value = minvaltoset;
		errormessage(objtocheck,jslang[language_code]['new_minval_set_1'] + '<strong> ' + minvaltoset + ' </strong>' + jslang[language_code]['new_minval_set_2']);
	}


}
// EPATOS

/* get a field label */
function getlabel(obj) {

	if (!document.getElementById(obj)) {
		var objtocheck = obj;
	} else {
		var objtocheck = document.getElementById(obj);
	}

	return retrievearguments(objtocheck,'onkeypress')['label'];

}

/* set a field as readonly and back */
function setreadonly(obj,statustoset) {

	var obj_array = new Array();

	if (typeof(obj) == 'object') {
		obj_array[0] = obj;
	} else {
		obj_array = obj.split(',');
	}

	for (i=0; i<obj_array.length; i++) {

		if (!document.getElementById(obj_array[i])) {
			var objtocheck = obj_array[i];
		} else {
			var objtocheck = document.getElementById(obj_array[i]);
		}

		switch (statustoset) {
			case true:
			case 'true':
			case 'readonly':
			$(objtocheck).addClass('readonly');
			$(objtocheck).attr('readonly','readonly');
			break;

			case false:
			case 'false':
			case 'normal':
			$(objtocheck).removeClass('readonly');
			$(objtocheck).removeAttr('readonly');
			break;
		}
	}
}

/* set a field as disabled and back */
function setdisabled(obj,statustoset) {

	var obj_array = new Array();

	if (typeof(obj) == 'object') {
		obj_array[0] = obj;
	} else {
		obj_array = obj.split(',');
	}

	for (i=0; i<obj_array.length; i++) {

		if (!document.getElementById(obj_array[i])) {
			var objtocheck = obj_array[i];
		} else {
			var objtocheck = document.getElementById(obj_array[i]);
		}

		switch (statustoset) {
			case true:
			case 'true':
			case 'readonly':
			$(objtocheck).addClass('disabled');
			$(objtocheck).attr('disabled','disabled');
			break;

			case false:
			case 'false':
			case 'normal':
			$(objtocheck).removeClass('disabled');
			$(objtocheck).removeAttr('disabled');
			break;
		}

	}

}

/* show errors coming from application, if any */
function showfielderror(obj,message,errortype) {

	if (!document.getElementById(obj)) {
		var objtocheck = obj;
	} else {
		var objtocheck = document.getElementById(obj);
	}

	seterror(objtocheck);
	errormessage(objtocheck,message);

	if (errortype == 'blocking') {
		$(objtocheck).addClass('blockingerror');
	}

}

/* polish field value from not allowed chars */
function sjbjl_fieldcleaner(objtoclean,obj_valuetype) {

	var valid_characters = validchars[obj_valuetype];
	var initstring = objtoclean.value;
	var finalstring = initstring;
	var done = false;
	for (i=0; i<initstring.length; i++) {
		if ((typeof(valid_characters) != 'object') && valid_characters.indexOf(initstring.charAt(i)) == -1) {
			finalstring = finalstring.replace(initstring.charAt(i),'');
			done = true;
		}
		objtoclean.value = finalstring;
	}

	initstring = objtoclean.value;

	switch (obj_valuetype) {
		case 'money':
		/* if more than one decimal separator present, leaves only one */

		while (initstring.count(sjbjl_decimal_separator) > 1) {
			decimal_separator_lastpos = initstring.lastIndexOf(sjbjl_decimal_separator);
			provstring_1 = initstring.substring(0,decimal_separator_lastpos);
			provstring_2 = initstring.substring(decimal_separator_lastpos+1);
			initstring = provstring_1 + provstring_2;
			done = true;
		}

		if (initstring.indexOf(sjbjl_decimal_separator) == -1) {
			initstring = initstring + sjbjl_decimal_separator + '00';
		} else if (initstring.lastIndexOf(sjbjl_decimal_separator) == initstring.length-1) {
			initstring = initstring + '00';
		} else if (initstring.lastIndexOf(sjbjl_decimal_separator) == initstring.length-2) {
			initstring = initstring + '0';
		}

		if (initstring.substring(0,1) == sjbjl_decimal_separator) {
			initstring = '0' + initstring;
		}
		objtoclean.value = initstring;
		break;

		default:
		break;
	}

	return done;
}

/* gives a modal window view of the alert */
function sjbjl_alert(alertype,message) {

	switch (alertype) {
		case 'error':
		$.modaldialog.error(message,{timeout:1.5});
		break;
		
		case 'warning':
		$.modaldialog.warning(message,{timeout:1.5});
		break;
		
		case 'success':
		$.modaldialog.success(message,{timeout:1.5});
		break;
		
	}

}

function sjbjl_confirm(txt,callback_ok,callback_ko) {

	if (callback_ok != undefined) {
		confirmed_ok = new Function(callback_ok);
	}

	if (callback_ko != undefined) {
		confirmed_ko = new Function(callback_ko);
	}

	return $.modaldialog.prompt(txt, {
		showClose:false,
		showPrompt:true
	});
}

// Strips HTML tags from within a string
function sjbjl_strip_tags(string_to_strip) {
	var stripped_string = string_to_strip.replace("<br />","\n");
	stripped_string = stripped_string.replace(/(<([^>]+)>)/ig,"");
	return stripped_string;
}

// Chek the CIN in an IBAN coordinate
function sjbjl_check_cin(cc) {

	aa="A0B1C2D3E4F5G6H7I8J9K#L#M#N#O#P#Q#R#S#T#U#V#W#X#Y#Z#-#.# #";
	bb="B1A0K#P#L#C2Q#D3R#E4V#O#S#F5T#G6U#H7M#I8N#J9W#Z#Y#X# #-#.#";
	dd=0;

	for(var ii=1;ii<22;ii+=2) {
		dd=dd+Math.floor(aa.indexOf(cc.charAt(ii))/2);
	}

	for(var ii=0;ii<22;ii+=2) {
		dd=dd+Math.floor(bb.indexOf(cc.charAt(ii))/2);
	}
	dd=dd-(Math.floor(dd/26)*26);

	return aa.charAt(dd*2);

}

/****************************************/
/* MULTILANGUAGE TRANSLATION (IT,EN,DE) */
/****************************************/

if (typeof(jslang) == 'undefined') {

	var jslang = new Array();

	// italian
	jslang['it'] = new Array();
	jslang['it']['noie6'] = 'Stai usando Internet Explorer 6!<br />Questo browser non e\' supportato a causa della sua incompatibilità con gli standard W3C!<br />Ti invitiamo ad utilizzare un browser compatibile!';
	jslang['it']['errortipmessage'] = 'Verificare il valore del campo!';
	jslang['it']['mandatory_field_1'] = 'Il campo - ';
	jslang['it']['mandatory_field_2'] = ' - e\' obbligatorio!';
	jslang['it']['maxlength_reached_1'] = 'La lunghezza massima di questo campo e\' ';
	jslang['it']['maxlength_reached_2'] = '!';
	jslang['it']['minlength_required_1'] = 'La lunghezza minima di questo campo e\' ';
	jslang['it']['minlength_required_2'] = '!';
	jslang['it']['new_maxlength_reached_1'] = 'Lunghezza MAX di questo campo impostata a ';
	jslang['it']['new_maxlength_reached_2'] = '!<br />Il valore è stato automaticamente modificato.';
	jslang['it']['new_minlength_set_1'] = 'Lunghezza MIN di questo campo impostata a ';
	jslang['it']['new_minlength_set_2'] = '!';
	jslang['it']['new_minval_set_1'] = 'Valore MIN di questo campo impostata a ';
	jslang['it']['new_minval_set_2'] = '!';

	jslang['it']['minvalmessage'] = 'Il valore deve essere superiore a ';
	jslang['it']['maxvalmessage'] = 'Il valore deve essere inferiore a ';
	jslang['it']['strict_minvalmessage'] = 'Il valore deve essere strettamente superiore a ';
	jslang['it']['strict_maxvalmessage'] = 'Il valore deve essere strettamente inferiore a ';
	jslang['it']['multipleofmessage'] = 'Il valore deve essere multiplo di ';

	jslang['it']['character_not_allowed'] = 'Caratteri consentiti:';
	jslang['it']['field_clean'] = 'Rimossi caratteri non validi.<br />Verificare il valore!';
	jslang['it']['timeerrormessages0'] = '';
	jslang['it']['timeerrormessages1'] = 'Formato ora non corretto';
	jslang['it']['timeerrormessages2'] = 'Ora non valida';
	jslang['it']['timeerrormessages3'] = 'Minuti non validi';
	jslang['it']['dataerrormessage0'] = '';
	jslang['it']['dataerrormessage1'] = 'Formato data non corretto';
	jslang['it']['dataerrormessage2'] = 'Giorno non valido nel campo data';
	jslang['it']['dataerrormessage3'] = 'Mese non valido nel campo data';
	jslang['it']['dataerrormessage4'] = 'Il mese nel campo data non ha 31 giorni';
	jslang['it']['dataerrormessage5'] = 'Nell\'anno in oggetto, febbraio ha solo 28 giorni';
	jslang['it']['dataerrormessage6'] = 'La data iniziale deve essere minore della data finale';
	jslang['it']['moneyerrormessage0'] = 'Il primo importo deve essere inferiore al secondo';

	jslang['it']['calendar_opener_alt_text'] = 'Clicca qui per aprire il calendario';
	jslang['it']['errorecodicefiscale'] = 'Codice Fiscale non corretto:<br />il codice di controllo non corrisponde.';
	jslang['it']['errorepartitaiva'] = 'Partita IVA non corretta: il codice di controllo non corrisponde.';
	jslang['it']['erroremoney1'] = 'Importo non valido!';
	jslang['it']['erroremoney2'] = 'Parte decimale non valida!';
	jslang['it']['only_one_decimal_separator_allowed'] = 'E\' ammesso un solo separatore di decimali.';

	jslang['it']['cartanonvalida'] = 'Carta non valida!';
	jslang['it']['regexp_failed_1'] = 'Formato ';
	jslang['it']['regexp_failed_2'] = ' errato!';
	jslang['it']['some_samples'] = '<br />Es.: ';

	jslang['it']['modal_error_title'] = 'Errore!';
	jslang['it']['modal_warning_title'] = 'Attenzione!';
	jslang['it']['modal_success_title'] = 'Operazione effettuata con successo!';
	jslang['it']['modal_prompt_title'] = 'Conferma operazione:';
	jslang['it']['modal_button_close'] = 'chiudi';
	jslang['it']['modal_button_confirm'] = 'conferma';
	jslang['it']['modal_button_cancel'] = 'annulla';

	jslang['it']['iban_codicenazione_1'] = 'Il codice nazionale ';
	jslang['it']['iban_codicenazione_2'] = ' non e\' valido.';
	jslang['it']['iban_lunghezza_1'] = 'Il codice IBAN di ';
	jslang['it']['iban_lunghezza_2'] = ' è composto da ';
	jslang['it']['iban_lunghezza_3'] = ' caratteri e non da ';
	jslang['it']['iban_cin_e_codicecontrollo'] = 'Il codice IBAN è errato.';
	jslang['it']['iban_cin_1'] = 'Il CIN digitato, ';
	jslang['it']['iban_cin_2'] = ', e\' errato.<br />Quello esatto e\' ';
	jslang['it']['iban_codicecontrollo_1'] = 'Il CODICE DI CONTROLLO digitato, ';
	jslang['it']['iban_codicecontrollo_2'] = ', e\' errato.<br />Quello esatto e\' ';

	// english
	jslang['en'] = new Array();
	jslang['en']['noie6'] = 'You are using Internet Explorer 6!<br />This browser is not supported due to its lack of compatibility with W3C standards!<br />We invite you to update your browser or try another one!';
	jslang['en']['errortipmessage'] = 'Please check field value!';
	jslang['en']['mandatory_field_1'] = 'The field - ';
	jslang['en']['mandatory_field_2'] = ' - is mandatory!';
	jslang['en']['maxlength_reached_1'] = 'The max length of this field is ';
	jslang['en']['maxlength_reached_2'] = '!';
	jslang['en']['minlength_required_1'] = 'The min length of this field is ';
	jslang['en']['minlength_required_2'] = '!';
	jslang['en']['new_maxlength_reached_1'] = 'Max length of this field set to ';
	jslang['en']['new_maxlength_reached_2'] = '.<br />The value has been automatically set.';
	jslang['en']['new_minlength_set_1'] = 'Min length of this field set to ';
	jslang['en']['new_minlength_set_2'] = '.';
	jslang['en']['new_minval_set_1'] = 'Min value of this field set to ';
	jslang['en']['new_minval_set_2'] = '!';

	jslang['en']['minvalmessage'] = 'Field value must be greater than ';
	jslang['en']['maxvalmessage'] = 'Field value must be lower than ';
	jslang['en']['strict_minvalmessage'] = 'Field value must be strictly greater than ';
	jslang['en']['strict_maxvalmessage'] = 'Field value must be strictly lower than ';
	jslang['en']['multipleofmessage'] = 'Field value must be multiple of ';

	jslang['en']['character_not_allowed'] = 'Characters allowed:';
	jslang['en']['field_clean'] = 'Invalid chars removed.<br />Check value!';
	jslang['en']['timeerrormessages0'] = '';
	jslang['en']['timeerrormessages1'] = 'Hour format not correct';
	jslang['en']['timeerrormessages2'] = 'Hour value not correct';
	jslang['en']['timeerrormessages3'] = 'Minutes value not correct';
	jslang['en']['dataerrormessage0'] = '';
	jslang['en']['dataerrormessage1'] = 'DATE format not valid';
	jslang['en']['dataerrormessage2'] = 'Day value not valid in DATE field';
	jslang['en']['dataerrormessage3'] = 'Month value not valid in DATE fiels';
	jslang['en']['dataerrormessage4'] = 'The month in DATE field has less than 31 days';
	jslang['en']['dataerrormessage5'] = 'In the selected year, february has only 28 days';
	jslang['en']['dataerrormessage6'] = 'Start DATE must be less than end DATE';
	jslang['en']['moneyerrormessage0'] = 'First amount must be lower than second';

	jslang['en']['calendar_opener_alt_text'] = 'Click here to open the calendar';
	jslang['en']['errorecodicefiscale'] = 'Wrong fiscal code:<br />control code doesn\'t match.';
	jslang['en']['errorepartitaiva'] = 'Wrong VAT number: control code doesn\'t match';
	jslang['en']['erroremoney1'] = 'Invalid amount!';
	jslang['en']['erroremoney2'] = 'Invalid decimal part!';
	jslang['en']['only_one_decimal_separator_allowed'] = 'It is allowed only one decimal separator.';

	jslang['en']['cartanonvalida'] = 'This card is not valid!';
	jslang['en']['regexp_failed_1'] = 'Wrong ';
	jslang['en']['regexp_failed_2'] = ' format!';
	jslang['en']['some_samples'] = '<br />Ex.: ';

	jslang['en']['modal_error_title'] = 'Error!';
	jslang['en']['modal_warning_title'] = 'Warning!';
	jslang['en']['modal_success_title'] = 'Operation successfully completed!';
	jslang['en']['modal_prompt_title'] = 'Please, confirm:';
	jslang['en']['modal_button_close'] = 'close';
	jslang['en']['modal_button_confirm'] = 'confirm';
	jslang['en']['modal_button_cancel'] = 'cancel';

	jslang['en']['iban_codicenazione_1'] = 'National code ';
	jslang['en']['iban_codicenazione_2'] = ' is wrong.';
	jslang['en']['iban_lunghezza_1'] = 'The IBAN code of ';
	jslang['en']['iban_lunghezza_2'] = ' is ';
	jslang['en']['iban_lunghezza_3'] = ' chars long and not ';
	jslang['en']['iban_cin_e_codicecontrollo'] = 'IBAN code is wrong.';
	jslang['en']['iban_cin_1'] = 'The CIN you entered, ';
	jslang['en']['iban_cin_2'] = ', is wrong.<br />The right one is ';
	jslang['en']['iban_codicecontrollo_1'] = 'The CONTROL CODE you entered, ';
	jslang['en']['iban_codicecontrollo_2'] = ', is wrong.<br />The right one is ';

	// deutsch
	jslang['de'] = new Array();
	jslang['de']['noie6'] = 'Sie verwenden Internet Explorer 6!<br />Dieser Browser ist nicht mit den Standards W3C!<br />und damit auch nicht mehr mit diesem Programm kompatibel. Bitte verwenden Sie für dieses Programm einen aktuellen, kompatiblen Browser!';
	jslang['de']['errortipmessage'] = 'Den Inhalt des Feldes überprüfen!';
	jslang['de']['mandatory_field_1'] = 'Das Feld -';
	jslang['de']['mandatory_field_2'] = '- ist obbligatorisch!';
	jslang['de']['maxlength_reached_1'] = 'Die max. Länge dieses Feldes beträgt';
	jslang['de']['maxlength_reached_2'] = '!';
	jslang['de']['minlength_required_1'] = 'Die min. Länge dieses Feldes beträgt';
	jslang['de']['minlength_required_2'] = '!';
	jslang['de']['new_maxlength_reached_1'] = 'Die max. Länge dieses Feldes beträgt';
	jslang['de']['new_maxlength_reached_2'] = '!<br />Der Wert wurde automatisch angepasst.';
	jslang['de']['new_minlength_set_1'] = 'Die min. Länge dieses Feldes beträgt';
	jslang['de']['new_minlength_set_2'] = '.';
	jslang['de']['new_minval_set_1'] = 'Die min. Wert dieses Feldes beträgt ';
	jslang['de']['new_minval_set_2'] = '!';

	jslang['de']['minvalmessage'] = 'Der Wert muss grösser sein als';
	jslang['de']['maxvalmessage'] = 'Der Wert muss kleiner sein als';
	jslang['de']['strict_minvalmessage'] = 'Der Wert muss grösser sein als';
	jslang['de']['strict_maxvalmessage'] = 'Der Wert muss kleiner sein als';
	jslang['de']['multipleofmessage'] = 'Der Wert muss ein Mehrfaches betragen von';

	jslang['de']['character_not_allowed'] = 'Zulässige Zeichen:';
	jslang['de']['field_clean'] = 'Nicht zulässige Zeichen wurden entfernt.<br />Bitte den Inhalt überprüfen!';
	jslang['de']['timeerrormessages0'] = '';
	jslang['de']['timeerrormessages1'] = 'Nicht korrektes Uhrzeitformat';
	jslang['de']['timeerrormessages2'] = 'Ungültige  Stundenangabe';
	jslang['de']['timeerrormessages3'] = 'Ungültige Minutenangabe';
	jslang['de']['dataerrormessage0'] = '';
	jslang['de']['dataerrormessage1'] = 'Nicht korrektes Datumsformat';
	jslang['de']['dataerrormessage2'] = 'Ungültige Tagesangabe';
	jslang['de']['dataerrormessage3'] = 'Ungültige Monatsangabe';
	jslang['de']['dataerrormessage4'] = 'Das angeführte Monat hat nicht 31 Tage';
	jslang['de']['dataerrormessage5'] = 'Im angeführten Jahr hat der Februar nur 28 Tage';
	jslang['de']['dataerrormessage6'] = 'Das Anfangsdatum muss kleiner sein als das Enddatum';
	jslang['de']['moneyerrormessage0'] = 'Der erste Betrag muss kleiner sein als der zweite';

	jslang['de']['calendar_opener_alt_text'] = 'Klicken Sie hier um den Kalender zu öffnen';
	jslang['de']['errorecodicefiscale'] = 'Nicht korrekte Steuernummer:<br />die Kontrollziffer ist ungültig.';
	jslang['de']['errorepartitaiva'] = 'Nicht korrekte Mehrwertsteuernummer: die Kontrollziffer ist ungültig.';
	jslang['de']['erroremoney1'] = 'Ungültiger Betrag!';
	jslang['de']['erroremoney2'] = 'Ungültige Dezimalstellen!';
	jslang['de']['only_one_decimal_separator_allowed'] = 'Es darf nur ein Dezimaltrennzeichen verwendet werden.';

	jslang['de']['cartanonvalida'] = 'Ungültige Karte!'
	jslang['de']['regexp_failed_1'] = 'Format ';
	jslang['de']['regexp_failed_2'] = 'falsch!';
	jslang['de']['some_samples'] = '<br />Beisp:';

	jslang['de']['modal_error_title'] = 'Fehler!';
	jslang['de']['modal_warning_title'] = 'Achtung!';
	jslang['de']['modal_success_title'] = 'Transaktion erfolgreich abgeschlossen!';
	jslang['de']['modal_prompt_title'] = 'Bestätigung der Transaktion:';
	jslang['de']['modal_button_close'] = 'Schliessen';
	jslang['de']['modal_button_confirm'] = 'ok';
	jslang['de']['modal_button_cancel'] = 'annullieren';

	jslang['de']['iban_codicenazione_1'] = 'Der Ländercode '; // '; // 'National code ';
	jslang['de']['iban_codicenazione_2'] = ' ist ungültig.'; //  is wrong.';
	jslang['de']['iban_lunghezza_1'] = 'Der IBAN-Code von '; // The IBAN code of ';
	jslang['de']['iban_lunghezza_2'] = ' ist zusammengesetzt aus '; //  is ';
	jslang['de']['iban_lunghezza_3'] = ' zeichen und nicht aus '; //  chars long and not ';
	jslang['de']['iban_cin_e_codicecontrollo'] = 'Der IBAN-code ist ungültig.'; // IBAN code is wrong.';
	jslang['de']['iban_cin_1'] = 'Der eingegebene CIN: '; // The CIN you entered, ';
	jslang['de']['iban_cin_2'] = ' ist ungültig.<br />Berechneter CIN ist: '; // , is wrong.<br />The right one is ';
	jslang['de']['iban_codicecontrollo_1'] = 'Die eingegebene Kontrollziffer: '; // The CONTROL CODE you entered, ';
	jslang['de']['iban_codicecontrollo_2'] = ' ist ungültig.<br />Berechneter Kontrollziffer ist: '; // , is wrong.<br />The right one is ';

}