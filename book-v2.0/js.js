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
		setBcg(pages[2], '#turning-page-left .front');
		setBcg(pages[3], '#turning-page-left .back');
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

	// nastavi back pozadia na vsetkych 8 pasikov
	var setBackBcg = function(img, selector, num) {
		var appendStr = $(selector + ' .backslice' + num).css('background', 'url("' + $('img.' + img).attr('src') + '")');
		appendStr += $(selector + ' .backslice' + num).css('background-position', ((num + 1) * 50) + 'px 0');		

		return appendStr;
	}

	// nastavi front pozadia na vsetkych 8 pasikov
	var setFrontBcg = function(img, selector, num) {
		var appendStr = $(selector + ' .frontslice' + num).css('background', 'url("' + $('img.' + img).attr('src') + '")');
		appendStr += $(selector + ' .frontslice' + num).css('background-position', (((7 - num) + 1) * 50) + 'px 0');		

		return appendStr;
	}

	// funkcia na farba vs. obrazok pri kliku vpravo
	var setBcg = function(img, selector) {
		if ((img > getImagesCount()) || (img <= 0))	
			return $(selector).css('background', '#efefef')
		else{
			var appendStr = $(selector).css('background', 'url("' + $('img.' + img).attr('src') + '")');

			if (selector.indexOf('back') !== -1){
				appendStr += $(selector).css('background-position', '50px 0');

				for (var i = 1; i <= 7; i++) {
					appendStr += setBackBcg(img, selector, i);
				};
			}

			if (selector.indexOf('front') !== -1){
				appendStr += $(selector).css('background-position', '0 0');

				for (var i = 1; i <= 7; i++) {
					appendStr += setFrontBcg(img, selector, i);
				};
			}		
			
			return appendStr;		
		}
	}

	// nastavi klasy pasikom = efekt otacania
	var animationClasses = function(page, slice, remove_class, add_class) {
		for (var i = 1; i <= 7; i++) {
			$(page + " ." + slice + i).removeClass(remove_class).addClass(add_class);
		}
	}

	// refresh obrazkov po prekliku vpravo
	var refreshImages = function() {

		pages = getPageNums();

		setBcg(pages[1], '#left-page');
		setBcg(pages[2], '#turning-page-left .front');
		setBcg(pages[3], '#turning-page-left .back');
		setBcg(pages[4], '#turning-page-right .front');
		setBcg(pages[5], '#turning-page-right .back');
		setBcg(pages[6], '#right-page');
	}

	// funkcia na preratanie stran pri kliku vpravo
	var handlePageNumsRight = function() {
		var img1 = $('#left-page .page-num').text();	

		$('#left-page .page-num').text(parseInt(img1, 10) + 2);
		$('#turning-page-left .front .page-num').text(parseInt(img1, 10) + 3);
		$('#turning-page-left .back .page-num').text(parseInt(img1, 10) + 4);
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
		$('#turning-page-left .front .page-num').text(parseInt(img1, 10) - 1);
		$('#turning-page-left .back .page-num').text(parseInt(img1, 10));
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

		var $this = jQuery(this);

		if ($this.data('activated')) return false;
		$this.data('activated', true);

		$("#turning-page-left").removeClass("leftClick");
		$("#turning-page-right").addClass("rightClick");

		animationClasses("#turning-page-right", "frontslice", "", "rightClick");

		setTimeout(function () {
			$("#turning-page-right").removeClass("rightClick").addClass("rightClick2");
			animationClasses("#turning-page-right", "frontslice", "rightClick", "rightClick2");
		},210);

		setTimeout(function () {
			$("#turning-page-right").removeClass("rightClick").addClass("rightClick3");
			animationClasses("#turning-page-right", "frontslice", "rightClick2", "rightClick3");
		},420);

		setTimeout(function () {
			$("#turning-page-right").removeClass("rightClick").addClass("rightClick4");
			animationClasses("#turning-page-right", "backslice", "", "rightClick");
		},800);

		setTimeout(function () {
			$("#turning-page-right").removeClass("rightClick").addClass("rightClick2");
			animationClasses("#turning-page-right", "backslice", "rightClick", "rightClick2");
		},1280);

		setTimeout(function () { 
			$('#turning-page-right').remove();

			var appendStr = '<div id="turning-page-right">';
			appendStr    += ' <div class="front">';
			appendStr    += ' <span class="overlay-right"></span>';
			appendStr    += '  <span class="page-num" style="visibility:hidden;"></span>';
			appendStr    += '  <div class="frontslice1">';
			appendStr    += '   <span class="overlay-right1"></span>';
			appendStr    += '   <div class="frontslice2">'; 
			appendStr    += '    <span class="overlay-right2"></span>';
            appendStr    += '    <div class="frontslice3">';
            appendStr    += '     <span class="overlay-right3"></span>';
            appendStr    += '     <div class="frontslice4">';
            appendStr    += '      <div class="frontslice5">';
            appendStr    += '       <div class="frontslice6">';
            appendStr    += '        <div class="frontslice7">';
            appendStr    += '        </div>';
            appendStr    += '       </div>';
            appendStr    += '      </div>';
            appendStr    += '     </div>';
            appendStr    += '    </div>';
            appendStr    += '   </div>';
			appendStr    += '  </div>';
			appendStr    += ' </div>';
			appendStr    += ' <div class="back">';
			appendStr    += ' <span class="overlay-left"></span>';
			appendStr    += '  <span class="page-num" style="visibility:hidden;"></span>';
			appendStr    += '  <div class="backslice1">';
			appendStr    += '   <span class="overlay-left1"></span>';
			appendStr    += '   <div class="backslice2">'; 
			appendStr    += '    <span class="overlay-left2"></span>';
            appendStr    += '    <div class="backslice3">';
            appendStr    += '     <span class="overlay-left3"></span>';
            appendStr    += '     <div class="backslice4">';
            appendStr    += '      <div class="backslice5">';
            appendStr    += '       <div class="backslice6">';
            appendStr    += '        <div class="backslice7">';
            appendStr    += '        </div>';
            appendStr    += '       </div>';
            appendStr    += '      </div>';
            appendStr    += '     </div>';
            appendStr    += '    </div>';
            appendStr    += '   </div>';
			appendStr    += '  </div>';
			appendStr    += ' </div>';
			appendStr    += '</div>';

			$('#book').children(':eq(1)').after(appendStr);
			handlePageNumsRight();
			refreshImages();
			$this.data('activated', false);
		}, 1610);

	});

	// klik dolava
	$(".left").click(function(){
		if (isBeginOfBook()) return false;

		var $this = jQuery(this);

		if ($this.data('activated')) return false;
		$this.data('activated', true);
		
		$("#turning-page-right").removeClass("rightClick");
		$("#turning-page-left").addClass("leftClick");
		
		animationClasses("#turning-page-left", "backslice", "", "leftClick");

		setTimeout(function () {
			$("#turning-page-left").removeClass("leftClick").addClass("leftClick2");
			animationClasses("#turning-page-left", "backslice", "leftClick", "leftClick2");
		},210);

		setTimeout(function () {
			$("#turning-page-left").removeClass("leftClick").addClass("leftClick3");
			animationClasses("#turning-page-left", "backslice", "leftClick2", "leftClick3");
		},420);

		setTimeout(function () {
			$("#turning-page-left").removeClass("leftClick").addClass("leftClick4");
			animationClasses("#turning-page-left", "frontslice", "", "leftClick");
		},800);

		setTimeout(function () {
			$("#turning-page-left").removeClass("leftClick").addClass("leftClick2");
			animationClasses("#turning-page-left", "frontslice", "leftClick", "leftClick2");
		},1280);

		setTimeout(function () { 
			$('#turning-page-left').remove();

			var appendStr = '<div id="turning-page-left">';
			appendStr    += ' <div class="front">';
			appendStr    += '  <span class="overlay-right"></span>';
			appendStr    += '  <span class="page-num" style="visibility:hidden;"></span>';
			appendStr    += '  <div class="frontslice1">';
			appendStr    += '   <span class="overlay-right1"></span>';
			appendStr    += '   <div class="frontslice2">'; 
			appendStr    += '   <span class="overlay-right2"></span>';
            appendStr    += '    <div class="frontslice3">';
            appendStr    += '     <span class="overlay-right3"></span>';
            appendStr    += '     <div class="frontslice4">';
            appendStr    += '      <div class="frontslice5">';
            appendStr    += '       <div class="frontslice6">';
            appendStr    += '        <div class="frontslice7">';
            appendStr    += '        </div>';
            appendStr    += '       </div>';
            appendStr    += '      </div>';
            appendStr    += '     </div>';
            appendStr    += '    </div>';
            appendStr    += '   </div>';
			appendStr    += '  </div>';
			appendStr    += ' </div>';
			appendStr    += ' <div class="back">';
			appendStr    += '  <span class="page-num" style="visibility:hidden;"></span>';
			appendStr    += '  <span class="overlay-left"></span>';
			appendStr    += '  <div class="backslice1">';
			appendStr    += '   <span class="overlay-left1"></span>';
			appendStr    += '   <div class="backslice2">'; 
			appendStr    += '    <span class="overlay-left2"></span>';
            appendStr    += '    <div class="backslice3">';
            appendStr    += '     <span class="overlay-left3"></span>';
            appendStr    += '     <div class="backslice4">';
            appendStr    += '      <div class="backslice5">';
            appendStr    += '       <div class="backslice6">';
            appendStr    += '        <div class="backslice7">';
            appendStr    += '        </div>';
            appendStr    += '       </div>';
            appendStr    += '      </div>';
            appendStr    += '     </div>';
            appendStr    += '    </div>';
            appendStr    += '   </div>';
			appendStr    += '  </div>';
			appendStr    += ' </div>';
			appendStr    += '</div>';

			$('#book').children(':eq(1)').after(appendStr);
			handlePageNumsLeft();
			refreshImages();
			$this.data('activated', false);
		}, 1610);

	});
})