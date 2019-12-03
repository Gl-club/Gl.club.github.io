App = new function() {
	var self = this;
	this._get_api_token_promise = $.Deferred();
	this._api_token = '';
	this._get_user_promise = null;

	this.config = {};
	this.config.app_name = (document.location.hostname.substr(0, document.location.hostname.indexOf(getEnv()) -1)) || "games";
	this.config.env_host = getEnv();
	this.config.login_host = 'accounts.famobi.com';
	this.config.login_path = '/#/login?continue=' + encodeURIComponent(document.location.href);
	this.config.logout_path = '/#/logout';

	this.config.cms_host = 'cms.' + this.config.env_host + 'famobi.com' + (document.location.port != "" ? ':' + document.location.port : '');
	this.config.reports_host = 'reports.' + this.config.env_host + 'famobi.com' + (document.location.port != "" ? ':' + document.location.port : '');
	this.config.developers_host = 'developers.' + this.config.env_host + 'famobi.com' + (document.location.port != "" ? ':' + document.location.port : '');
	this.config.games_host = 'games.' + this.config.env_host + 'famobi.com' + (document.location.port != "" ? ':' + document.location.port : '');
	this.config.dashboard_path = '/#/';
	this.config.api_token_path = '/login/getToken.html?app=' + this.config.app_name;

	this.debug = !1;
	this.modules = {};

	this.model = {};

	this.User = {
		"first_name": "Guest",
		"last_name" : "",
		"is_logged_in": false,
		"permission": {
			"data": {}
		},
		"can": function(permission) {
			return this.permission.data.indexOf(permission) > -1;
		}
	};
	this.PortalCollection = [];
};

App.init = function() {
	this.bindEvents();
	this.setItemWidth();
	this.log('%c' + document.location.hostname + ' (powered by Famobi)', 'font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; color: #fff; font-size: 20px; padding: 15px 20px; background: #444; border-radius: 4px; line-height: 100px; text-shadow: 0 1px #000"');
};

App.bindEvents = function() {
	this.handleClick('[data-navigate-back]', this.navigateBack);
};

App.handleResize = function() {
	this.setItemWidth();
};

App.getUser = function() {
	if (this._get_user_promise) {
		return this._get_user_promise;
	}

	var self = this,
		q1 = this.getApiToken(),
		q2 = this.getApiUser;
		$(window).on('fa:user-resolved', function() { App.log("user resolved")}),
		onError = function() {
			App.User.is_logged_in = false;
			$(window).trigger('fa:user-resolved');
		};

	return this._get_user_promise = q1.pipe(q2).then(function(res) {
		App.User = $.extend(App.User, res.data);
		App.User.is_logged_in = true;
		$(window).trigger('fa:user-resolved');
	}).fail(onError);
};

App.getUserPromise = function() {
	return this._get_user_promise;
};

App.getPortals = function() {
	var self = this,
		q1 = this.getUserPromise(),
		q2 = this.getApiPortals;
		$(window).on('fa:portals-resolved', function() { App.log("portals resolved")}),
		onError = function() {
			$(window).trigger('fa:portals-resolved');
		};

	return q1.pipe(q2).then(function(res) {
		App.PortalCollection = $.extend(App.PortalCollection, res.data);
		$(window).trigger('fa:portals-resolved');
	}).fail(onError);
};

App.getApiPortals = function() {
	var self = this;

	if (!App.User.is_logged_in) {
		return false;
	}

	return $.ajax({
		url: '/services/user/portals',
		headers: {
			"Authorization": "Bearer " + App._api_token
		},
		error: function(res) {
			App.log('error', res.responseJSON ? res.responseJSON.error : "unknown");
		},
		success: function(res) {
			App.log('omg success!', res.data);
		}
	});
};

App.getGame = function(id) {
	
};

App.getApiGame = function(id) {
	var self = this;

	return $.ajax({
		url: '/services/game/games/' + id + '?include=params'
	});
};

App.getApiTokenPromise = function() {
	return this._get_api_token_promise;
};

App.getApiToken = function() {
	var self = this,
		iframe = document.createElement("iframe"),
		iframeUrl = location.protocol + '//' + App.config.login_host + App.config.api_token_path;

	this.getApiTokenPromise().then(function(token) {
		App.log("token, no token?", token);
		self._api_token = token;
	});

	iframe.setAttribute('src', iframeUrl);
	document.querySelectorAll('body')[0].appendChild(iframe);
	window.addEventListener("message", function(event) {
		if (event.origin.indexOf(App.config.login_host) < 0)
			return;

		var data = JSON.parse(event.data);

		if (data.action === 'setToken'){
			if (data.token) {
				self.getApiTokenPromise().resolve(data.token);
			} else {
				self.getApiTokenPromise().reject("no token");
			}
		}
	}, false);

	return this.getApiTokenPromise();
};

App.getApiUser = function() {
	var self = this;

	console.log(App._api_token);

	return $.ajax({
		url: 'http://famobi-1uxin.portals.famobi.com/services/user/me',
		headers: {
			"Authorization": "Bearer " + App._api_token
		},
		error: function(res) {
			App.log('not logged in, reason: ', res.responseJSON ? res.responseJSON.error : "unknown");
		},
		success: function(res) {
			App.log('omg success!', res.data);
		}
	});
};

App.setItemWidth = function() {
	var itemWidth, 
		itemCounter,
		$ul,
		$li,
		liWidth,
		bigItemWidth;

	$('section.games ul').each(function() {
		itemWidth = false;
		itemCounter = 0;

		$ul = $(this);

		$ul.find('li').attr('style', '');
		$ul.find('li').each(function() {
			itemCounter++;

			$li = $(this);
			liWidth = $li.width();

			if((liWidth< itemWidth && liWidth > 0) || !itemWidth) {
				itemWidth = liWidth - 1;
			}
		}).css('width', itemWidth);

		if(itemCounter > 1) {
			bigItemWidth = itemWidth*2;
			$ul.find('li:first-child').css('width', bigItemWidth);
		}
	});
};

App.navigateBack = function() {
	if (document.referrer || document.referrer.indexOf('//' + document.location.host) > -1) {
		return !!history.back();
	}
};

App.handleClick = function(selector, eventHandler) {
	// http://stackoverflow.com/questions/13396297/windows-phone-8-touch-support
	if (window.navigator.msPointerEnabled) {
		$(document).on('MSPointerDown', selector, eventHandler);
	} else {
		// $(document).on(!detection.is.touch ? "click" : "touchstart", selector, eventHandler);
		$(document).on("click", selector, eventHandler);
	}
};

$(window).ready(function() {
	App.init();

	$(window).resize(function() {
		App.handleResize();
	});
});

/**
 * create log function with proper line number
 */
(function createLogger() {
	App.log = function() {};
	App.error = function() {};
	if (App.debug && window.console) {
		if (Function.prototype.bind) {
			App.log = Function.prototype.bind.call(window.console.log, window.console);
			App.error = Function.prototype.bind.call(window.console.error, window.console);
		} else {
			App.log = function() {
				Function.prototype.apply.call(window.console.log, window.console, arguments);
			};
			App.error = function() {
				Function.prototype.apply.call(window.console.error, window.console, arguments);
			};
		}
	}
})();

function getEnv() {
	return document.location.hostname.indexOf('.dev.famobi') > -1 ? 'dev.' : 
		document.location.hostname.indexOf('.staging.gc.famobi') > -1 ? 'staging.gc.' : ''; 
}

/*
Handlebars.registerHelper('dump', function (context) {
	App.log("context", context);
	return new Handlebars.SafeString(
	  '<pre>' + JSON.stringify(context) + '</pre>'
	);
});
*/

// App.getApiUser();