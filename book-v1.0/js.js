$(document).ready(function() {

	// funkcia na zistenie poctu obrazkov
	var getImagesCount = function() {
		return $("#cupons > img").size();
	}

	// funkcia na vratenie pola cisiel aktualnych stranok
	var getPageNums = function() {

		var page1 = $('#left-page .page-num').text();

		var pages = {
			1 : page1,
			2 : parseInt(page1, 10) + 1,
			3 : parseInt(page1, 10) + 2,
			4 : parseInt(page1, 10) + 3,
			5 : parseInt(page1, 10) + 4,
			6 : parseInt(page1, 10) + 5,
		};

		return pages;
	}

	// pociatocne obrazky na knizke
	var initImages = function() {
		$('.book').each(function() {
			var slide = $(this).data('slide');
			$('.slide', this).hide();
			$('.slide', this).eq(slide).show();
		});

		pages = getPageNums();

		setBcg(pages[1], '#left-page');
		setBcg(pages[2], '#turning-page-left .back');
		setBcg(pages[3], '#turning-page-left .front');
		setBcg(pages[4], '#turning-page-right .front');
		setBcg(pages[5], '#turning-page-right .back');
		setBcg(pages[6], '#right-page');
	};

	// funkcia na zistenie ci som na zaciatku knizky
	var isBeginOfBook = function() {
		pages = getPageNums();

		if (pages[1] == -1) return true;

		return false;
	}

	// funkcia na zistenie ci uz som na konci knizky
	var isEndOfBook = function() {
		pages = getPageNums();

		if (pages[3] == getImagesCount() || pages[4] == getImagesCount()) return true;

		return false;
	}

	// funkcia na farba vs. obrazok pri kliku vpravo
	var setBcg = function(img, selector) {
		if ((img > getImagesCount()) || (img <= 0))	
			return $(selector).css('background', '#aaa')
		else
			return $(selector).css('background', 'url("' + $('img.' + img).attr('src') + '")');		
	}

	// refresh obrazkov po prekliku vpravo
	var refreshImages = function() {

		pages = getPageNums();

		setBcg(pages[1], '#left-page');
		setBcg(pages[2], '#turning-page-left .back');
		setBcg(pages[3], '#turning-page-left .front');
		setBcg(pages[4], '#turning-page-right .front');
		setBcg(pages[5], '#turning-page-right .back');
		setBcg(pages[6], '#right-page');
	}

	// funkcia na preratanie stran pri kliku vpravo
	var handlePageNumsRight = function() {
		var img1 = $('#left-page .page-num').text();	

		$('#left-page .page-num').text(parseInt(img1, 10) + 2);
		$('#turning-page-left .back .page-num').text(parseInt(img1, 10) + 3);
		$('#turning-page-left .front .page-num').text(parseInt(img1, 10) + 4);
		$('#turning-page-right .front .page-num').text(parseInt(img1, 10) + 5);
		$('#turning-page-right .back .page-num').text(parseInt(img1, 10) + 6);
		$('#right-page .page-num').text(parseInt(img1, 10) + 7);	

		$('.num-left').text(parseInt(img1, 10) + 4);
		$('.num-right').text(parseInt(img1, 10) + 5);
	}

	// funkcia na preratanie stran pri kliku vlavo
	var handlePageNumsLeft = function() {
		var img1 = $('#left-page .page-num').text();	

		$('#left-page .page-num').text(parseInt(img1, 10) - 2);
		$('#turning-page-left .back .page-num').text(parseInt(img1, 10) - 1);
		$('#turning-page-left .front .page-num').text(parseInt(img1, 10));
		$('#turning-page-right .front .page-num').text(parseInt(img1, 10) + 1);
		$('#turning-page-right .back .page-num').text(parseInt(img1, 10) + 2);
		$('#right-page .page-num').text(parseInt(img1, 10) + 3);	

		$('.num-left').text(parseInt(img1, 10));
		$('.num-right').text(parseInt(img1, 10) + 1);
	}

	initImages();

	// klik doprava
	$(".right").click(function(){

		if (isEndOfBook()) return false;

		$("#turning-page-right").removeClass("leftClick").addClass("rightClick");

		var $this = jQuery(this);

		if ($this.data('activated')) return false;
		$this.data('activated', true);

		setTimeout(function () { 
			$('#turning-page-right').remove();
			$('#book').children(':eq(1)').after('<div id="turning-page-right"> <div class="front"> <span class="overlay-right"></span> <span class="page-num" style="visibility:hidden;"></span> </div> <div class="back"> <span class="overlay-left"></span> <span class="page-num" style="visibility:hidden;"></span> </div> </div>');
			handlePageNumsRight();
			refreshImages();
			$this.data('activated', false);
		}, 800);

	});

	// klik dolava
	$(".left").click(function(){
		if (isBeginOfBook()) return false;

		$("#turning-page-left").removeClass("rightClick").addClass("leftClick");

		var $this = jQuery(this);

		if ($this.data('activated')) return false;
		$this.data('activated', true);

		setTimeout(function () { 
			$('#turning-page-left').remove();
			$('#book').children(':eq(1)').after('<div id="turning-page-left"> <div class="front"> <span class="overlay-left"></span> <span class="page-num" style="visibility:hidden;"></span> </div> <div class="back"> <span class="overlay-right"></span> <span class="page-num" style="visibility:hidden;"></span> </div> </div>');
			handlePageNumsLeft();
			refreshImages();
			$this.data('activated', false);
		}, 800);

	});
})