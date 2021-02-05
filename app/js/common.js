$(function() {

	$('input:not([name=phone])').on('input', onInput)
	var inputValue = ''
	function onInput(e) {
		if(e.currentTarget.value.length > 15) {
			e.currentTarget.value = inputValue
			return
		}
		inputValue = e.currentTarget.value
	}

	// Проверка поддержки Webp
	function hasWebP() {
		var rv = $.Deferred(), img = new Image()
		img.onload = function() { rv.resolve() }
		img.onerror = function() { rv.reject() }
		img.src = "http://www.gstatic.com/webp/gallery/1.webp"
		return rv.promise()
	}
	hasWebP().then(function() {
	}, function() {
		$('body').addClass('no-webp')
	})

	// Клик по гамбургеру на моб версии
	$('.nav-mob__link').click(function() {
		$('.nav-mob').toggleClass('active')
	})
	$('.nav-list__li').click(function() {
		$('.nav-mob').removeClass('active')
	})

	const heightNav = $('.nav').innerHeight()
	const heightModelNav = $('.model-menu').innerHeight()
	const allHeightNav =  heightNav+heightModelNav

	// Скролинг по якорям
	$('.anchor').bind("click", function(e){
		const anchor = $(this)
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top-allHeightNav // отступ от меню
		}, 500)
	e.preventDefault()
	})

	if ($(window).width() > 991) {
		const heightImg = $('.head-img').height()
		$('.autoHeight').css('min-height', heightImg)

		$('.head, .page-head, .special-head').css('margin-top', allHeightNav+'px')
		$('.page-head, .page-head .row, .special-head, .special-head .row').css('min-height', 'calc(100vh - '+allHeightNav+'px - 50px)')

		$(window).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(event) {
			delta = parseInt(event.originalEvent.wheelDelta || -event.originalEvent.detail)
			if (delta >= 0) {
				//$('.nav').css('top', '0')
				$('.model-menu').css({
					'top' : '91px',
					'z-index' : '10'
				})
			} else {
				//$('.nav').css('top', '-91px')
				$('.model-menu').css({
					'top' : '-100px',
					'z-index' : '-1'
				})
			}
		})
	}


	function headLine(item, vector) {
		let bg = document.querySelector('.'+item)
		window.addEventListener('mousemove', function(e) {
			let x = e.clientX / window.innerWidth
			let y = e.clientY / window.innerHeight
			bg.style.transform = 'translate(-0px,' +vector + y * 50 + 'px)'
		})
	}
	if ($('header').hasClass('head') == true) {
		headLine('head-line_1', '-')
		headLine('head-line_2', '+')
		headLine('head-line_3', '+')
		headLine('head-line_4', '-')
	}
	
	setTimeout(function () {
		$('.head-container').addClass('animated')
	}, 1000)

	// Инит фансибокса
	$('.fancybox').fancybox({
		//margin: 0,
		//padding: 0,
		touch: false
	})

	$('.modal-close').click(function() {
		$.fancybox.close()
	})

	if ($(window).width() > 575) {
		$('.benefits-item').matchHeight({byRow: false})
		$('.sale-item').matchHeight({byRow: false})
	}

	if ($(window).width() > 991) {
		$('.headAuto').matchHeight({byRow: false})
	}

	$('.head-slider').slick({
		dots: true,
		arrows: false,
		fade: true,
		slidesToShow: 1,
		adaptiveHeight: true,
		autoplay: true,
		autoplaySpeed: 7000,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					dots: false,
					arrows: true,
					autoplay: false
				}
			}
		]
	})

	$('.reviews-slider').slick({
		dots: true,
		fade: true,
		slidesToShow: 1,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					dots: false
				}
			}
		]
	})

	$('.reviews-slider .slick-dots li button, .head-slider .slick-dots li button').each( function(){
		if ($(this).html() < 10) {
			$(this).prepend('0');
		}
	})

	$('.model-slider').slick({
		slidesToShow: 5,
		infinite: false,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
				}
			}
		]
	})

	$('.old-value__btn').click(function() {
		const btnTradeIn = $(this).data('type')
		if (btnTradeIn == true) {
			$('.old-form').addClass('show')
			$('.old-value__btn').removeClass('old-value__btn_active')
			$(this).addClass('old-value__btn_active')
		} else {
			$('.old-form').removeClass('show')
			$('.old-value__btn').removeClass('old-value__btn_active')
			$(this).addClass('old-value__btn_active')
		}
	})

	$('.credit-value__btn').click(function() {
		const creditValue = $(this).text()
		$('.credit-form input[name=insurance]').val(creditValue)
		$('.credit-value__btn').removeClass('credit-value__btn_active')
		$(this).addClass('credit-value__btn_active')
	})

	// Отправка формы
	$('form').submit(function() {
		let data = $(this).serialize()
		data += '&ajax-request=true'
		const price = $(this).find('input[name=price]').val()
		$.ajax({
			type: 'POST',
			url: '/mail.php',
			dataType: 'json',
			data: data,
			success: (function() {
				$.fancybox.close()
				$.fancybox.open({src:'#thn'})
				if (price !== '') {
					window.open(price,'_blank')
				}
			})()
		})
		return false
	})

	$('.info-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		asNavFor: '.info-slider-nav',
		centerMode: true,
		infinite: false
	})
	$('.info-slider-nav').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		asNavFor: '.info-slider',
		arrows: false,
		focusOnSelect: true,
		infinite: false,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 4,
				}
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 2,
				}
			}
		]
	})

	$('.open').click(function() {
		const title = $(this).data('title')
		const button = $(this).data('button')
		const formTitle = $(this).data('form')
		const price = $(this).data('price')
		const crmId = $(this).data('crmid')
		$('.modal-form__ttl').html(title)
		$('.modal-form__btn span').html(button)
		$('.modal-form input[name=title]').val(formTitle)
		$('.modal-form input[name=price]').val(price)
		$('.modal-form input[name=crm-id]').val(crmId)
	})

	$('.banks-value').on('click', 'button:not(.banks-value__btn_active)', function() {
	$(this)
		.addClass('banks-value__btn_active').siblings().removeClass('banks-value__btn_active')
		.closest('.banks').find('.banks-block').removeClass('show').eq($(this).index()).addClass('show')
	})

	const videos = document.querySelectorAll('.video');
	let generateUrl = function(id) {
		let query = '?autoplay=1';
		return 'https://www.youtube.com/embed/' + id + query;
	};
	let createIframe = function(id) {
		let iframe = document.createElement('iframe');
		iframe.setAttribute('src', generateUrl(id));
		iframe.setAttribute('width', '560');
		iframe.setAttribute('height', '315');
		iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
		iframe.setAttribute('allowfullscreen', '');		
		iframe.setAttribute('style', 'border:none; height:350px;');		
		return iframe;
	};
	videos.forEach((el) => {
		let videoHref = el.getAttribute('data-video');
		let deletedLength = 'https://youtu.be/'.length;
		let videoId = videoHref.substring(deletedLength, videoHref.length);
		let img = el.querySelector('img');
		let youtubeImgSrc = 'https://i.ytimg.com/vi/' + videoId + '/maxresdefault.jpg';
		img.setAttribute('src', youtubeImgSrc);
		el.addEventListener('click', (e) => {
			e.preventDefault();
			let iframe = createIframe(videoId);
			el.querySelector('img').remove();
			el.appendChild(iframe);
			el.querySelector('button').remove();
		});
	});

	window.onload = function() {
		setTimeout(function(){
			const srcMap = $('.foot-map iframe').data('src')
			$('.foot-map iframe').attr('src', srcMap)
		}, 3000);
	};

})
