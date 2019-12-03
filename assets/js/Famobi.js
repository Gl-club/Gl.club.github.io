function checkMobile() {
	var isMobile = false;
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		isMobile = true;
	}

	return isMobile;
}

function setVideoSize() {
	var $videoContainer = $('iframe.video');

	if($videoContainer.length > 0) {
		var containerWidth = $videoContainer.outerWidth();
		var aspectRatio = $videoContainer.attr('data-aspect-ratio');

		var videoHeight = Math.round(containerWidth/aspectRatio);

		$('iframe.video').css('height', videoHeight);
	}
};

function setFamobiVideoSize() {
	var $videoHolder = $('.videoHolder');

	if($videoHolder.length > 0) {
		var containerWidth = $videoHolder.outerWidth();

		var videoHeight = Math.round(containerWidth/1.7777);

		$('iframe.famobiVideo').css('width', containerWidth);
		$('iframe.famobiVideo').css('height', videoHeight);
	}
};

function appendFamobiVideo(hd) {
	var $videoHolder = $('.videoHolder');

	if($videoHolder.length > 0) {
		if(hd) {
			$('.videoHolder').append('<iframe src="https://www.youtube.com/embed/sXovi_4PoZY?vq=hd720&amp;rel=0&amp;controls=1&amp;showinfo=0&amp;autoplay=1" frameborder="0" allowfullscreen class="famobiVideo"></iframe>');
		} else {
			$('.videoHolder').append('<iframe src="https://www.youtube.com/embed/sXovi_4PoZY?rel=0&amp;controls=1&amp;showinfo=0&amp;autoplay=1" frameborder="0" allowfullscreen class="famobiVideo"></iframe>');
		}
	}
}

/*! Lazy Load 1.9.7 - MIT license - Copyright 2010-2015 Mika Tuupola */
!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!1,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);

var LOCALE = $('html').attr('lang');

var sliderTimer = null;
var sliderSetBackTimer = null;

function slide(page, jumpDirectly) {
	var $slider = $('.slider');
	var $slides = $slider.find('li');

	// Set transition to slider
	$slides.css('transition', 'left 1s linear');

	if(typeof jumpDirectly == "undefined") jumpDirectly = false;
	if(jumpDirectly) {
		// Remove transition from slider
		$slides.css('transition', 'none');
	}
	
	var numSlides = $slides.length;

	if(numSlides > 1) {
		var $activeSlide = $slider.find('li.active');
		var slideWidth = $activeSlide.width();
		var activeSlide = Number($activeSlide.attr('data-no'));
		var nextSlide = activeSlide + 1;

		if(page) {
			nextSlide = page;
		}
		
		if(nextSlide > numSlides) {
			nextSlide = 1;
		}

		var $nextSlide = $slider.find('li[data-no="'+nextSlide+'"]');

		// Slide active slide
		$activeSlide.css('left', '-'+slideWidth+'px');
		$activeSlide.removeClass('active');

		sliderSetBackTimer = setTimeout(function() {
			// Set position for inactive slide
			$activeSlide.addClass('lowest');
			$activeSlide.css('left', '100%');
		}, 1500);

		// Slide next slide
		$nextSlide.removeClass('lowest');
		$nextSlide.addClass('active');
		$nextSlide.css('left', 0);

		// Set Slidepage
		$('.sliderPages li').removeClass('active');
		$('.sliderPages li[data-no="'+nextSlide+'"]').addClass('active');

		sliderTimer = setTimeout(function() {
			slide();
		}, 10000);
	}
}

function initSlider() {
	// Clear timer
	if(sliderTimer){
		clearTimeout(sliderTimer);
		sliderTimer = null;
	}
	
	if(sliderSetBackTimer){
		clearTimeout(sliderSetBackTimer);
		sliderSetBackTimer = null;
	}

	var $slider = $('.slider');

	if ($slider.length > 0) {
		// Set slider height and width
		var $slides = $slider.find('li');

		// Reset old values
		$slides.removeClass('active');
		$slides.css('height', '');
		$slides.css('width', '');
		$slider.css('height', '');
		$slider.find('.textHolder').css('height', '');
		$slider.find('li').css('left', '100%');
		$slider.find('li:first-child').css('left', '0');

		var $firstSlide = $slider.find('li:first-child');

		// Set first slide active
		$firstSlide.addClass('active');

		// find tallest height
		var slideHeight = 0;
		$slider.find('li').each(function() {
			thisSlideHeight = $(this).outerHeight();
			if(thisSlideHeight > slideHeight) {
				slideHeight = thisSlideHeight;
			}
		});

		// set slide width
		var slideWidth = $firstSlide.width();

		if(!$slider.hasClass('asHeader')) {
			$slider.height(slideHeight+'px');
			$slides.width(slideWidth+'px');
		}

		$slider.css('min-height', 'auto');

		if ($slides.length > 1) {
			// Set textHolder height
			var teaserHolderHeight = $slider.find('.teaserHolder').height();
			textHolderHeight = slideHeight - teaserHolderHeight;
			$slider.find('.textHolder').css('height', textHolderHeight+'px');
			
			// Add slider pages
			var $sliderPages = $('.sliderPages');
			$sliderPages.html('');

			var activeClass = '';
			for(var i = 1; i <= $slides.length; i++) {
				activeClass = '';
				if (i == 1) activeClass = 'class="active"';
				$sliderPages.append('<li data-no="'+i+'" '+activeClass+'><a href="javascript:void(0);"></a></li>');
			}

			sliderTimer = setTimeout(function() {
				slide();
			}, 10000);
		}
	}
}

function initScreenshots() {
	var $screenshotHolder= $('.screenshotHolder');

	if ($screenshotHolder.length > 0) {
		var $firstSlide = $screenshotHolder.find('li:first-child');
		$screenshotHolder.find('li').height($firstSlide.height()+'px');
		var numScreenshots = Number($screenshotHolder.find('li').length);

		var $screenshotPages = $('.screenshotPages');
		$screenshotPages.html('');

		var activeClass = '';
		for(var i = 1; i <= numScreenshots; i++) {
			activeClass = '';
			if (i == 1) activeClass = 'class="active"';
			$screenshotPages.append('<li data-no="'+i+'" '+activeClass+'><a href="javascript:void(0);"></a></li>');
		}
	}
}

function switchScreenshot(direction) {
	var $screenshotHolder= $('.screenshotHolder');
	var $screenshotPages = $('.screenshotPages');
	var activeScreenshot = Number($screenshotHolder.find('li.active').attr('data-no'));
	var numScreenshots = Number($screenshotHolder.find('li').length);

	var nextScreenshot = 1;

	if(direction == "left") {
		nextScreenshot = activeScreenshot - 1;

		if(nextScreenshot < 1) nextScreenshot = numScreenshots;
	} else if(direction == "right") {
		nextScreenshot = activeScreenshot + 1;
		
		if(nextScreenshot > numScreenshots) nextScreenshot = 1;
	} else {
		nextScreenshot = direction;
	}

	$screenshotHolder.find('li').removeClass('active');
	$screenshotHolder.find('li[data-no="'+nextScreenshot+'"]').addClass('active');

	$screenshotPages.find('li').removeClass('active');
	$screenshotPages.find('li[data-no="'+nextScreenshot+'"]').addClass('active');

}

function animateHeader() {
	var $holder = $('.slider.asHeader .teaserHolder');

	if($holder.length > 0) {
		$holder.css('background-size', 'auto 105%');

		setTimeout(function() {
			$holder.css('background-size', 'auto 100%');

			setTimeout(function() {
			 	animateHeader();
			}, 10000);
		}, 10000);
	}
}

function renderSearch(results) {
	var searchResultsElm = $('section.searchResultsList');
	var searchResults = '';

	if(results.length > 0) {
		searchResults += '<ul>';
		$.each(results, function(index, value) {
			searchResults += '<li><a href="/'+value.special.package_id+'/?locale='+LOCALE+'"><img class="lazy" data-original="'+value.image+'" src="/assets/img/Placeholder/PremiumTeaserBg.png" alt=""></a>';
		});
		searchResults += '</ul>';

		searchResultsElm.append(searchResults);

		$('section.searchResultsList .lazy').lazyload({
			effect: "fadeIn"
		});
	} else {
		$('.searchResultNoHits').removeClass('hide');
	}
}

function renderSearchDropdown(results) {
	var searchResultsElm = $('.searchHolder .searchResults');
	var searchResults = '';

	searchResultsElm.html('');

	if(results.length > 0) {
		searchResults += '<ul>';
		$.each(results, function(index, value) {
			searchResults += '<li><a href="/'+value.special.package_id+'/?locale='+LOCALE+'"><img src="'+value.image+'" alt=""> '+value.title+'</a>';
		});
		searchResults += '</ul>';

		searchResultsElm.append(searchResults);
	}
}

var loadAlgolia = null;

function doSearch(query, numEntries) {
	if (typeof numEntries == "undefined") {
		numEntries = 20;
	}

	if (!loadAlgolia) {
		loadAlgolia = $.getScript("https://cdn.jsdelivr.net/algoliasearch/3/algoliasearch.min.js");
	}

	return new Promise(function(resolve) {
		loadAlgolia.then(function() {
			var client = algoliasearch('X2Q0ZAVWU3', '0eac3e36e3a6a3728486a3bd10f659b6');
			var index = client.initIndex('h5games');

			index.search({ query: query, length: numEntries, offset: 0, facets: ['special.source'], filters: 'special.source:famobi.com' }, function(err, content) {
				if (err) {
					console.error(err);
					resolve([]);
				}

				resolve(content.hits);
			});
		});
	});
}

function setGameHeaderHeight() {
	var $iFrameHolder = $('.iFrameHolder');
	var windowWidth = $(window).width();
	var $affiliateContainer = $('.textHolder .affiliateContainer');
	var $slider = $('.slider.asHeader');
	var $teaserHolder =  $slider.find('.teaserHolder');

	if($teaserHolder.hasClass('.noDesignElements')) {
		$teaserHolder.css('height', '250px');
	}
	$teaserHolder.find('.thumb').addClass('hide');

	if($iFrameHolder.length == 1 && $iFrameHolder.css('display') != 'none') {
		var $iFrame = $iFrameHolder.find('iframe');
		var frameGameUrl = $iFrame.attr('data-src');
		var windowHeight = $(window).height();
		var textHolderHeight = $('.textHolder').height();
		
		var setHeight = windowHeight - $teaserHolder.offset().top - (textHolderHeight/3*2);
		var maxWidth = $teaserHolder.width() * 0.9;
		var spaceHeight = setHeight * 25/100;
		var hideAssets = false;
		var maxHeight = 670;
		var aspectRatio = $teaserHolder.attr('data-aspect-ratio');
	
		if($slider.hasClass('landscape')) {
			if($teaserHolder.hasClass('noDesignElements')) {
				spaceHeight = 0;
			}

			iFrameHeight = setHeight - spaceHeight;
			iFrameWidth = iFrameHeight * aspectRatio;
			
			if(iFrameWidth > maxWidth) {
				iFrameWidth = maxWidth;
				iFrameHeight = iFrameWidth / aspectRatio;
			}

			if(iFrameHeight < 320) {
				iFrameHeight = iFrameHeight + spaceHeight;
				iFrameWidth = iFrameHeight * aspectRatio;
				hideAssets = true;
			}

			if($teaserHolder.hasClass('noDesignElements')) {
				maxHeight = iFrameHeight;
			}

			if(iFrameHeight > maxHeight) {
				iFrameHeight = maxHeight;
				iFrameWidth = iFrameHeight * aspectRatio;
			}

			$iFrameHolder.css('height', iFrameHeight+'px');
			$iFrameHolder.css('width', iFrameWidth+'px');
			
			$teaserHolder.find('.teaserElements .figure').css('display', 'block');
			$teaserHolder.find('.teaserElements .logo').css('display', 'block');
			
			if(hideAssets) {
				$teaserHolder.find('.teaserElements .figure').css('display', 'none');
				$teaserHolder.find('.teaserElements .logo').css('display', 'none');
			}
		}

		if(setHeight > maxHeight) setHeight = maxHeight;

		$teaserHolder.css('height', setHeight+'px');

		if(typeof $iFrame.attr('src') === "undefined" || $iFrame.attr('src') == "") {
			$iFrame.attr('src', frameGameUrl);
		}
	} else {
		// showing thumb
		$teaserHolder.find('.thumb').removeClass('hide');
	}
	
	var $cta = $slider.find('.playContainer .cta');
	var isMobile = checkMobile();

	// Show desktop only game hint
	var $desktopOnlyHint = $slider.find('.desktopOnlyHint');

	if($desktopOnlyHint.length == 1 && isMobile) {
		$desktopOnlyHint.removeClass('hide');
		$cta.remove();
	}

	// Show correct cta and hide affiliate box on mobile
	if(isMobile) {
		$affiliateContainer.remove();

		$cta.find('.ctaText.playFullscreen').addClass('hide');
		$cta.find('.ctaText.play').removeClass('hide');
	}
}

function getAllGames() {
	var $allGamesContainer = $('.allGamesContainer');
	var game = '';
	var gameThumb = '';
	var numEntries = 1000;

	return doSearch('*', numEntries).then(function(hits) {
		hits.forEach(function(game) {
			gameThumb = game.image.replace("//img.cdn.famobi.com/", "//ik.imagekit.io/sjyfpsp1n/");
			$allGamesContainer.append('<li><a href="/'+game.special.package_id+'/?locale='+LOCALE+'" title="'+game.title+'"><img class="lazy" data-original="'+gameThumb+'" src="/assets/img/Placeholder/PremiumTeaserBg.png" alt="'+game.title+'"></a></li>');
		});
	});
}

function toggleMenu(hideOnly) {
	var $menu = $('.topNavigation .menuHolder').find('.menu');
	var $closeMenuIcon = $('.topNavigation .menuHolder').find('.closeMenu');
	var $showMenuIcon = $('.topNavigation .menuHolder').find('.showMenu');
		
	if($menu.hasClass('hide') && !hideOnly) {
		$menu.removeClass('hide');
		$closeMenuIcon.removeClass('hide');
		$showMenuIcon.addClass('hide');
	} else {
		$menu.addClass('hide');
		$closeMenuIcon.addClass('hide');
		$showMenuIcon.removeClass('hide');
	}
}

$(window).resize(function() {
	initSlider();
	initScreenshots();
	setVideoSize();
	setGameHeaderHeight();
	setFamobiVideoSize();
});

$(window).on('load', function() {
	setGameHeaderHeight();
	initScreenshots();
});

String.prototype.readableUrl = function() {
	return this.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
}

$(document).ready(function() {
	initSlider();
	setVideoSize();
	// animateHeader();

	if($('.searchHolder input').val() != "") {
		$('.searchHolder').addClass('typing');
	}

	$('[data-action="switchScreenshot"]').on('click', function(){
		var direction = $(this).attr('data-direction');

		switchScreenshot(direction);
	});

	$('.searchContainer form').on('submit', function() {
		var locale = $('html').attr('lang') || "en";
		var searchString = $(this).find('input').val();
		searchString = searchString.readableUrl();
		
		location.href = '/'+searchString+'/?locale='+locale;

		return false;
	});

	$('.sliderPages [data-no] a').on('click', function() {
		var slideToPage = $(this).closest('li').attr('data-no');

		// Clear timer
		if(sliderTimer){
			clearTimeout(sliderTimer);
			sliderTimer = null;
		}
		
		if(sliderSetBackTimer){
			clearTimeout(sliderSetBackTimer);
			sliderSetBackTimer = null;
		}
	
		slide(slideToPage, true);

		return false;
	});

	$('.screenshotPages [data-no] a').on('click', function() {
		var switchToPage = $(this).closest('li').attr('data-no');
		
		switchScreenshot(switchToPage);

		return false;
	});

	$('svg.closeDesktopOnlyHint').on('click', function(){
		$('.desktopOnly').remove();

		return false;
	});

	$('.affiliateContainer input').on('click', function(e){
		this.focus();
		this.select();
		try {
			document.execCommand('copy');
			$('.clipboardHint').remove();
			$(this).after('<span class="clipboardHint">Copied to clipboard!</span>');

			setTimeout(function() {
				$('.clipboardHint').remove();
			}, 2000);
		} catch(e) {

		}
	});

	$('.searchHolder .x').on('click', function() {
		var holder = $(this).closest('.searchHolder');
		var input = holder.find('input');
		input.val('');
		input.focus();
		holder.find('.searchResults').html('');

		return false;
	});

	$(window).on('click', function() {
		toggleMenu(true);
	});

	$('[data-toggle-menu]').on('click', function() {
		toggleMenu(false);

		return false;
	});

	$('.searchHolder input').on('focus', function() {
		var holder = $(this).closest('.searchHolder');
		var value = $(this).val();

		if(!holder.hasClass('typing')) holder.addClass('typing');
		if(value != "") {
			doSearch(value).then(function(results) {
				renderSearchDropdown(results);
			});
		}
	});

	$('.searchHolder input').on('blur', function() {
		var holder = $(this).closest('.searchHolder');
		
		setTimeout(function() {
			holder.find('.searchResults').html('');
		}, 250);

		if($(this).val() == "") {
			holder.removeClass('typing');
		}
	});

	$('.searchHolder input').on('keyup', function() {
		var value = this.value;

		if(value !== "") {
			doSearch(value).then(function(results) {
				renderSearchDropdown(results);
			});
		}

		return false;
	});

	$('.playVideo').on('click', function(e) {
		$('body').append('<div class="overlayContent famobiVideo"><a href="#" class="overlayClose">×</a><div class="inner videoHolder"></div></div>');

		$('.overlayClose').off('click', function() {});
		$('.overlayClose').on('click', function() {
			$('.overlayContent').remove();
			
			return false;
		});

		if(checkMobile()) {
			appendFamobiVideo(false);
			setFamobiVideoSize();
		} else {
			setTimeout(function() {
				setTimeout(function() {
					appendFamobiVideo(true);
					setFamobiVideoSize();
				}, 500);
			}, 100);
		}
		
		e.preventDefault();
	});

	$('[data-tooltip]').hover(function() {
		var text = $(this).attr('data-tooltip');
		var tooltipPos = $(this).offset();
		tooltipPos.top += $(this).height() + 5;

		$('body').append('<span class="tooltip" style="top: '+tooltipPos.top+'px; left: '+tooltipPos.left+'px;">'+text+'</span>');
	}, function() {
		$('.tooltip').remove();
	});
});

$('.lazy').lazyload({
	effect: "fadeIn",
	threshold: 200
});

cmds.forEach(function(cmd) {
	cmd();
});

cmds = {};
cmds.push = function(cmd) {
	cmd();
};
