/*
 * http://www.leigeber.com/2008/04/custom-javascript-dialog-boxes/
 */
(function($) {
	var modaldialog = { };

	// Creates and shows the modal dialog
	function showDialog (msg, options) {
		// Make sure the dialog type is valid. If not assign the default one (the first)
		if(!$.inArray(options.type, modaldialog.DialogTypes)) {
			options.type = modaldialog.DialogTypes[0];
		};

		// Merge default title (per type), default settings, and user defined settings
		var settings = $.extend({ title: modaldialog.DialogTitles[options.type] }, modaldialog.defaults, options);

		// If there's no timeout, make sure the close button is show (or the dialog can't close)
		settings.timeout = (typeof(settings.timeout) == "undefined") ? 0 : settings.timeout;
		settings.showClose = (typeof(settings.showClose) == "undefined") ? true : !!settings.showClose;

		// Check if the dialog elements exist and create them if not
		if (!document.getElementById('dialog')) {
			dialog = document.createElement('div');
			dialog.id = 'dialog';
			$(dialog).html(
				"<div id='dialog-header'>" +
					"<div id='dialog-title'></div>" +
					"<div id='dialog-close'></div>" +
				"</div>" +
				"<div id='dialog-content'>" +
					"<div id='dialog-content-inner' />" +
					"<div id='dialog-button-container'>" +
						"<input type='button' id='dialog-button' value='" + jslang[language_code]['modal_button_close'] + "'>" +
					"</div>" +
						
					"<div id='dialog-prompt-container'>" +
						"<input type='button' id='dialog-prompt-yes' value='" + jslang[language_code]['modal_button_confirm'] + "' style='float:left;'>" +
						"<input type='button' id='dialog-prompt-no' value='" + jslang[language_code]['modal_button_cancel'] + "' style='float:left;'>" +
					"</div>" +
						
				"</div>"
				);
			
			dialogmask = document.createElement('div');
			dialogmask.id = 'dialog-mask';
			
			$(dialogmask).hide();
			$(dialog).hide();
			
			document.body.appendChild(dialogmask);
			document.body.appendChild(dialog);

			// Set the click event for the "x" and "Close" buttons
			$("#dialog-close").click(modaldialog.hide);
			$("#dialog-button").click(modaldialog.hide);
			$("#dialog-prompt-yes").click(modaldialog.hideyes);
			$("#dialog-prompt-no").click(modaldialog.hideno);

		}

		var dl = $('#dialog');
		var dlh = $('#dialog-header');
		var dlc = $('#dialog-content');
		var dlb = $('#dialog-button');

		var dlpy = $('#dialog-prompt-yes');
		var dlpn = $('#dialog-prompt-no');

		$('#dialog-title').html(settings.title);
		$('#dialog-content-inner').html('<strong><br />' + msg + '</strong>');

		// Center the dialog in the window but make sure it's at least 25 pixels from the top
		// Without that check, dialogs that are taller than the visible window risk
		// having the close buttons off-screen, rendering the dialog unclosable 
		dl.css('width', settings.width);
		var dialogTop = Math.abs($(window).height() - dl.height()) / 2;
		dl.css('left', ($(window).width() - dl.width()) / 2);
		dl.css('top', (dialogTop >= 25) ? dialogTop : 25);

		// Clear the dialog-type classes and add the current dialog-type class		
		$.each(modaldialog.DialogTypes, function () { dlh.removeClass(this + "header") });
		dlh.addClass(settings.type + "header")
		$.each(modaldialog.DialogTypes, function () { dlc.removeClass(this) });
		dlc.addClass(settings.type);
		$.each(modaldialog.DialogTypes, function () { dlb.removeClass(this + "button") });
		dlb.addClass(settings.type + "button")

		$.each(modaldialog.DialogTypes, function () { dlpy.removeClass(this + "button") });
		dlpy.addClass(settings.type + "button")
		$.each(modaldialog.DialogTypes, function () { dlpn.removeClass(this + "button") });
		dlpn.addClass(settings.type + "button")

		if (!settings.showClose) {
			$('#dialog-close').hide();
			$('#dialog-button-container').hide();
		} else {
			$('#dialog-close').show();
			$('#dialog-button-container').show();
		}

		if (!settings.showPrompt) {
			$('#dialog-prompt-container').hide();
			$('#dialog-prompt-yes').hide();
			$('#dialog-prompt-no').hide();
		} else {
			$('#dialog-prompt-container').show();
			$('#dialog-prompt-yes').show();
			$('#dialog-prompt-no').show();
		}
		
		if (settings.timeout) {
			window.setTimeout("$('#dialog').fadeOut('slow', 0); $('#dialog-mask').fadeOut('normal', 0);", (settings.timeout * 1000));
		}
		
		dl.fadeIn("slow");
		$('#dialog-mask').fadeIn("normal");
		$('#dialog').draggable({handle:'#dialog-header'});
	};

	modaldialog.error = function $$modaldialog$error (msg, options) {
		if (typeof(options) == "undefined") {
			options = {
				showClose: true
			};
		}
		options['type'] = "error";
		return(showDialog(msg, options));
	}
	modaldialog.warning = function $$modaldialog$error (msg, options) {
		if (typeof(options) == "undefined") {
			options = {
				showClose: true
			};
		}
		options['type'] = "warning";
		return(showDialog(msg, options));
	}
	modaldialog.success = function $$modaldialog$error (msg, options) {
		if (typeof(options) == "undefined") {
			options = {
				showClose: true
			};
		}
		options['type'] = "success";
		return(showDialog(msg, options));
	}

	modaldialog.prompt = function $$modaldialog$error (msg, options, url) {
		if (typeof(options) == "undefined") {
			options = {
				showPrompt: true
			};
		}
		options['type'] = "prompt";
		return(showDialog(msg, options));
	}

	modaldialog.hideyes = function $$modaldialog$hide () {
		if (typeof confirmed_ok == 'function') {
			confirmed_ok();
		}
		$('#dialog').fadeOut("slow", function () { $(this).hide(0); });
		$('#dialog-mask').fadeOut("normal", function () { $(this).hide(0); });
		return true;
	};

	modaldialog.hideno = function $$modaldialog$hide () {
		if (typeof confirmed_ko == 'function') {
			confirmed_ko();
		}
		$('#dialog').fadeOut("slow", function () { $(this).hide(0); });
		$('#dialog-mask').fadeOut("normal", function () { $(this).hide(0); });
		return false;
	};
	
	modaldialog.hide = function $$modaldialog$hide () {
		$('#dialog').fadeOut("slow", function () { $(this).hide(0); });
		$('#dialog-mask').fadeOut("normal", function () { $(this).hide(0); });
	};

	modaldialog.DialogTypes = new Array("error", "warning", "success", "prompt");

	modaldialog.DialogTitles = {
		"error": jslang[language_code]['modal_error_title']
		, "warning": jslang[language_code]['modal_warning_title']
		, "success": jslang[language_code]['modal_success_title']
		, "prompt": jslang[language_code]['modal_prompt_title']
	};

	modaldialog.defaults = {
		timeout:0,
		width:525,
		showPrompt:false,
		showClose:true
	};

	$.extend({ modaldialog: modaldialog });
})(jQuery);
