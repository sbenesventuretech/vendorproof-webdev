jQuery(function($){
	var $con = $('.miwt_form');
	var $body = $('body');

	var CSS_CLASS_SELECT_INIT = 'select2-init';

	var DEFAULT_SELECT_OPTIONS = {
		theme: 'pt',
		minimumResultsForSearch: 10
	};

	var stepFinderConfig = [
		{
			query: '.payment_capture',
			cls: 'step_payment'
		},
		{
			query: '.transaction_table',
			cls: 'step_receipt'
		},
		{
			query: '.w9form',
			cls: 'step_w9form'
		}
	];

	//http://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
	isMobile = (function() {
		var check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	})();

	function tempUpdates(context) {
		var $context = $(context);
		$context.find('.steps li').each(function(idx, el) {
			$(this).find('.step_number').text(idx + 1);
		});

		$context.find('.suffix_container .label').text('Suffix');

		$context.find('.step_info').each(function() {
			$(this).html($(this).html().replace('<br>', ' '));
		});

		$context.find('.active_step_info').remove();

		$.each(stepFinderConfig, function(idx, val) {
			if ($context.find(val.query).length) {
				$body.addClass(val.cls);
			} else {
				$body.removeClass(val.cls);
			}
		});

		$context.find('.active .step_info').each(function(){
			var curIdx = $(this).parent().index();
			var curPage = curIdx + 1;
			$(this)
				.clone()
				.insertBefore('.steps')
				.text('Step ' + curPage + ': ' + $(this).text())
				.addClass('active_step_info');
		});

		$context.find('.steps .active').prevAll().addClass('step_completed');

		if (!$context.find('.step_con').length) {
			$context.find('.active_step_info, .steps').wrapAll('<div class="step_con" />');
		}

		$context.find('.birth_date input[maxlength=2]').addClass('birth_date_input birth_date_month');
		$context.find('.birth_date input[maxlength=4]').addClass('birth_date_input birth_date_year');

		$context.find('.tin > .label').each(function() {
			var tinHtml = $(this).html();
			if (tinHtml.indexOf('label') < 0) {
				$(this).html(tinHtml.replace('Tax Identification Number', '<label>Tax Identification Number</label>'));
				$(this).html(tinHtml.replace('Social Security Number', '<label>Social Security Number</label>'));
			}
		});

		$context.find('.payment_table').insertBefore('.payment_info');

		$context.find('.payment_table').children().not('h2').wrapAll('<div class="payment_box_content" />');
		$context.find('.payment_info').children().not('h2').wrapAll('<div class="payment_box_content" />');

		$context.find('.payment_capture > a').each(function() {
			var $link = $(this);

			if (!$link.find('.payment_powered_text').length) {
				$link
					.insertAfter($context.find('.payment_info'))
					.prepend('<span class="payment_powered_text">Payments secured by</span>')
					.wrap('<div class="payment_powered" />');
			}
		});

		$context.find('.persistence_actions').insertAfter('.payment_info');
		$context.find('span.back_button').prependTo($context.find('.persistence_actions'));
		$context.find('.payment_table h2, .payment_info h2').remove();

		$context.find('.transaction_table .total').append('<td />');

		$context.find('.transaction_table').insertAfter($context.find('.transaction_details h2').first()).removeAttr('style');

		$context.find('.transaction_detail, .transaction_detail .label').removeAttr('style');

		$context.find('.billing_address').addClass('transaction_detail');
		$context.find('.billing_address').prepend($('<span class="label" />').text($context.find('.billing_address h2').first().text()));
		$context.find('.billing_address h2').first().remove();

		if ($context.find('.transaction_table, .w9form').length) {
			$('.step_con').remove();
		}
	}

	function scrollToMessages(context) {
		var $context = $(context);
		if ($context.find('.message').length) {
			$('html, body').scrollTop($context.find('.message').eq(0).offset().top);
		}
	}

	function destroySelectUpdates(context) {
		var $con = $(context || document);

		if (isMobile) {
			return;
		}

		if (!$con.hasClass(CSS_CLASS_SELECT_INIT)) {
			$con = $con.find('select').filter('.' + CSS_CLASS_SELECT_INIT);
		}

		if ($con.length) {
			$con.removeClass(CSS_CLASS_SELECT_INIT).select2('destroy');
		}
	}

	function initSelectUpdates(context) {
		var $con = $(context || document);

		if (isMobile) {
			return;
		}

		if (!$con.is('select')) {
			$con = $con.find('select');
		}

		if ($con.length && !($con.closest('.cke_dialog').length || $con.closest('tr[data-dnd-source-def]').length)) {
			$con
				.select2(DEFAULT_SELECT_OPTIONS)
				.addClass(CSS_CLASS_SELECT_INIT)
				.filter('[data-features~="watch"]')
				.on('change', miwt.observerFormSubmit);
		}
	}

	function initSteps(context) {
		var $con = $(context);
		var $stickyEl = $con.find('.step_con');

		if ($stickyEl.length) {
			var sticky = new Waypoint.Sticky({
				element: $stickyEl.get(0)
			});
		}

	}

	function updateHelpPoints(context) {
		var $con = $(context);
		var $helpPoints = $con.find('span.help_point');

		$helpPoints.each(function(){
			var $helpPoint = $(this);
			var text;

			if ($helpPoint.attr('title').length) {
				text = $helpPoint.attr('title').replace(/\([^\)]*\)\s+$/, '');
				text = text.replace('(Example:', '<br />(Example:');

				$helpPoint.attr('title', '');
				$helpPoint.text('');

				new Opentip($helpPoint, text, {
					showOn: 'click',
					hideOn: 'click',
					fixed: true,
					tipJoint: 'top right',
					targetJoint: 'bottom',
					target: true,
					group: '1',
					containInViewport: true,
					className: "pt-tip",
					background: '#444444',
					borderColor: '#1F434F'
				});
			}
		});

		$(document)
			.on('click', '.opentip-container, .help_point', function(evt) {
				evt.stopPropagation();
			})
			.on('click', function(evt) {
				for (var i = 0; i < Opentip.tips.length; i++) {
					Opentip.tips[i].hide();
				}
			});
	}

	$con.each(function(){
		var form = this;
		var $form = $(form);
		var lastBtnHitId;

		$form.on('focus', '.business_information input, .business_information select', function(evt){
			$(this).closest('.prop').addClass('active').siblings().removeClass('active');
		});

		$form.on('click', '.business_information .ctb label', function(evt){
			$(this).siblings('input[type=checkbox]').focus();
		});

		$form.on('click', '.business_information .ctb input[type=checkbox]', function(evt){
			$(this).focus();
		});

		form.submit_options = {
			preProcessNode: function(data) {
				destroySelectUpdates(document.getElementById(data.refid));
				return data.content;
			},
			postProcessNode: function(data) {
				$.each(data, function(idx, d) {
					initSelectUpdates(d.node);
				});
			},
			postUpdate: function() {
				tempUpdates(form);
				initSteps(form);
				updateHelpPoints(form);
				if (lastBtnHitId) {
					scrollToMessages(form);
				}
			},
			onSubmit: function() {
				lastBtnHitId = form.btnhit.value;
				return true;
			}
		};

		tempUpdates(form);
		initSteps(form);
		initSelectUpdates(form);
		updateHelpPoints(form);
		scrollToMessages(form);
	});
});