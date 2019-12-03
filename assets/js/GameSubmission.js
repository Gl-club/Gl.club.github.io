var bindAction = 'click';

if ('ontouchstart' in document.documentElement) {
	bindAction = 'touchstart';
}

$(document).ready(function() { 
	$(document).on(bindAction, '[data-game-submission-overlay="open"]', function() {
		showGameSubmissionOverlay();
		return false;
	});

	$(document).on(bindAction, '[data-game-submission-overlay="close"]', function() {
		$('#gameSubmission .overlay').removeClass('show');

		setTimeout(function() {
			$('#gameSubmission').addClass('hide');
		
			$('#gameSubmission .submitForm').removeClass('hide');	
			$('#gameSubmission .submitted').addClass('hide');	

			$('#gameSubmission form input[type="url"]').val('');
			$('#gameSubmission form input[type="email"]').val('');
		}, 250);

		return false;
	});

	$(document).on(bindAction, '#gameSubmission [name="privacy"]', function() {
		$('#gameSubmission .error').addClass('hide');
	});

	function showGameSubmissionOverlay() {
		var $overlay = $('#gameSubmission').removeClass('hide');
		$('#gameSubmission').find('input[name="url"]').focus();

		setTimeout(function() {
			$('.overlay').addClass('show');
		}, 250);
	}

	var hash = window.location.hash;
	if(hash.indexOf('&') > -1) {
		hash = hash.substring(0, hash.indexOf('&'));
	}
	if(hash == '#game-submission') {
		showGameSubmissionOverlay();
	}

	$('#gameSubmission form').submit(function(event) {
		$('#gameSubmission .overlay .loading').removeClass('hide');

		var submitUrl = 'https://us-central1-famobi-01.cloudfunctions.net/v1submitGame';
		var url = $(this).find('input[name="url"]').val();
		var email = $(this).find('input[name="email"]').val();

		var privacyConsent = $(this).find('input[name="privacy"]').get(0).checked;

		if(privacyConsent) {
			$.post(submitUrl, { url: url, email: email }).done(function(response) {
				$('#gameSubmission .submitForm').addClass('hide');
				$('#gameSubmission .submitted').removeClass('hide');

				$('#gameSubmission .overlay .loading').addClass('hide');
			});
		} else {
			$('#gameSubmission .overlay .loading').addClass('hide');			
			$('#gameSubmission .error').removeClass('hide');
		}

		event.preventDefault();
	});
}); 