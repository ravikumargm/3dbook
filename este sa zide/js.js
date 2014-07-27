$(document).ready(function() {

// setTimeout(function () { $("sildeToBuyContent").setStyle("overflow","visible") }, 1000);

	$(".click").click(function(){
		$('.s1').removeClass('s1').addClass('s1a1');
		$('.s2').removeClass('s2').addClass('s2a1');
		$('.s3').removeClass('s3').addClass('s3a1');
		$('.s4').removeClass('s4').addClass('s4a1');
		$('.s5').removeClass('s5').addClass('s5a1');		

		setTimeout(function () { 
			console.log("end of flip");
			$('.s1a1').removeClass('s1a1').addClass('s1a2');
			$('.s2a1').removeClass('s2a1').addClass('s2a2');
			$('.s3a1').removeClass('s3a1').addClass('s3a2');
			$('.s4a1').removeClass('s4a1').addClass('s4a2');
			$('.s5a1').removeClass('s5a1').addClass('s5a2');
		}, 550);
	})

	// $("#book").mouseenter(function(){
	// 	setTimeout(function () { 
	// 		console.log("end of flip");
	// 		$('.slice.s1a1').removeClass('s1a1').addClass('s1a2');
	// 		$('.slice.s2a1').removeClass('s2a1').addClass('s2a2');
	// 		$('.slice.s3a1').removeClass('s3a1').addClass('s3a2');
	// 		$('.slice.s4a1').removeClass('s4a1').addClass('s4a2');
	// 		$('.slice.s5a1').removeClass('s5a1').addClass('s5a2');
	// 	}, 550);
	// });

	// $("#book").mouseleave(function(){
	// 	setTimeout(function () { 
	// 		console.log("end of flip");
	// 		$('.slice.s1a2').removeClass('s1a2').addClass('s1a1');
	// 		$('.slice.s2a2').removeClass('s2a2').addClass('s2a1');
	// 		$('.slice.s3a2').removeClass('s3a2').addClass('s3a1');
	// 		$('.slice.s4a2').removeClass('s4a2').addClass('s4a1');
	// 		$('.slice.s5a2').removeClass('s5a2').addClass('s5a1');
	// 	}, 550);
	// });



	// $("img").click(function() {
	// 	var i = 0;
	// 	var myTimer = setInterval(function(){
	// 		i--;
	// 		$("img").css("-webkit-transform", "perspective(500px) rotateY(" + i + "deg) rotate3d(1, 0.43, 0.42, -13deg)");
	// 		$("img").css("transform", "perspective(500px) rotateY(" + i + "deg) rotate3d(1, 0.43, 0.42, -13deg)");
	// 		if (i == -360){
	// 			clearInterval(myTimer);
	// 		}
	// 	}, 10);
 //    });

})