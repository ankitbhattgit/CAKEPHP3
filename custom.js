jQuery(window).scroll(function(){
	var windowscroll = jQuery(window).scrollTop();
	if(windowscroll >= 380){
		jQuery(".navbar-default").addClass("topbar-fixed");
	}
	else{
		jQuery(".navbar-default").removeClass("topbar-fixed");	
	}	
});
/******* bxslider ********/
$('.cmntbxslider').bxSlider({
  auto: true,
  autoControls: true
});
function bxsliderespons(){
	var winwidth = jQuery(window).width();
	if (winwidth >= 768){
	
	jQuery('.partnerSlider').bxSlider({
          auto: true,
		  minSlides: 5,
		  responsive:true,
		   pause: 3000,
		  maxSlides: 5,
		  slideWidth: 200,
		  slideMargin: 10
	});
	
	
	}
	else if (winwidth <= 767 && winwidth >= 481){
	  jQuery('.bxslider').bxSlider({
		  minSlides: 2,
		  maxSlides: 2,
		  slideWidth: 400,
		  slideMargin: 10
		});
		jQuery('.partnerSlider').bxSlider({
		  minSlides: 3,
		  maxSlides: 3,
		  slideWidth: 400,
		  slideMargin: 10
	});
	}
	else{
	  jQuery('.bxslider').bxSlider({
		  minSlides: 3,
		  maxSlides: 1,
		  slideWidth: 300,
		  slideMargin: 10
		});
		jQuery('.partnerSlider').bxSlider({
		  minSlides:2,
		  maxSlides: 2,
		  slideWidth: 400,
		  slideMargin: 10
	});
	}
}
jQuery(window).resize(function(){
	bxsliderespons();
})
jQuery(document).ready(function(){
	bxsliderespons();
})

/*********** SEARCH FILTER ***********/    
jQuery(".filter-icon").click(function(){
	jQuery(".search-filter").toggleClass("slideFilter");
});


/*********** DASHBOARD SIDEBAR (17JULY2017) ***********/    
jQuery(".handbuerg").click(function(){
	jQuery("body").toggleClass("sidebarToggle");
});
/*********** /DASHBOARD SIDEBAR (17JULY2017) ***********/ 
   
/*********** INNER FILTER (20JULY2017) ***********/    
jQuery(".sort-srch-fltr").click(function(){
	jQuery(".inner-filter").addClass("showfilter");
});
jQuery(".inner-filter .filter-icon").click(function(){
	jQuery(".inner-filter").removeClass("showfilter");
});
/*********** /INNER FILTER (20JULY2017) ***********/   
/******* BANNER HEIGHT ********/
function bannerht(){
	var winht = jQuery(window).height();
	jQuery(".banner").css("min-height", winht);
}
jQuery(document).ready(function() {
    bannerht();
});
jQuery(window).resize(function() {
    bannerht();
});
/******* BANNER HEIGHT ********/

jQuery(document).ready(function () {

    jQuery('.registration-form fieldset:first-child').fadeIn('slow');

    jQuery('.registration-form input[type="text"]').on('focus', function () {
        jQuery(this).removeClass('input-error');
    });

    // next step
    jQuery('.registration-form .btn-next').on('click', function () {
        var parent_fieldset = jQuery(this).parents('fieldset');
        var next_step = true;

        parent_fieldset.find('input[type="text"],input[type="email"]').each(function () {
            if (jQuery(this).val() == "") {
                jQuery(this).addClass('input-error');
                next_step = false;
            } else {
                jQuery(this).removeClass('input-error');
            }
        });

        if (next_step) {
            parent_fieldset.fadeOut(400, function () {
                jQuery(this).next().fadeIn();
            });
        }

    });

    // previous step
    jQuery('.registration-form .btn-previous').on('click', function () {
        jQuery(this).parents('fieldset').fadeOut(400, function () {
            jQuery(this).prev().fadeIn();
        });
    });

    // submit
    jQuery('.registration-form').on('submit', function (e) {

        jQuery(this).find('input[type="text"],input[type="email"]').each(function () {
            if (jQuery(this).val() == "") {
                e.preventDefault();
                jQuery(this).addClass('input-error');
            } else {
                jQuery(this).removeClass('input-error');
            }
        });

    });

   
});
/******* TOOLTIP ********/
jQuery(document).ready(function(){
    jQuery('[data-toggle="tooltip"]').tooltip(); 
	jQuery(".select-wrap").mouseenter(function() {
        jQuery(".CaptionCont.SelectBox").attr("title", "");
    });
	
});
/******* TOOLTIP ********/
/******* SIDEBAR TOGGLE (1AGST2017) ********/
jQuery(document).ready(function(){
	jQuery(".close-side").click(function(){
		jQuery(".main-wrap").toggleClass("toggleslide");
		var humbargtext = $(".close-side p").text();
		if(humbargtext=="Hide"){
			jQuery(".close-side p").text('Show');
		}
		else{
			jQuery(".close-side p").text('Hide');
		}
	});
});
/******* /SIDEBAR TOGGLE (1AGST2017) ********/
/******* RELOAD BXSLIDER (1AGST2017) ********/
jQuery(document).ready(function(){
	jQuery(".action-table div:first-child").click(function(){
		//  jQuery(this).children().children().toggleClass("activeheart");
	});	
	jQuery(".compare-lender-logo .fa").click(function(){
		jQuery(this).toggleClass("activeheart");
	});	
	var slider = jQuery(".cmntbxslider").bxSlider({
	  mode: 'horizontal'
	});
	jQuery('.close-side').click(function(e){
	  e.preventDefault();
	  slider.reloadSlider();
	});
});
/******* /RELOAD BXSLIDER (1AGST2017) ********/
/******* LOGIN TAB (7AGST2017) ********/
$(".login-tab li a").click(function(){
	$(".login-tab li a").not($(this)).removeClass("active");
	$(this).addClass("active");
});
/******* /LOGIN TAB (7AGST2017) ********/
/******* RECOMMENTDED INPUT (8AGST2017) ********/
$(".rcmnd-lnk-bx").click(function(){
	$(".rcmnd-inptara").slideToggle();
});
/******* /RECOMMENTDED INPUT (8AGST2017) ********/
/************ CUSTOM SCROLL (21AGST2017) *************/
(function($){
	$(window).on("load",function(){
		
		$(".mCustomScrollbar").mCustomScrollbar({
			theme:"minimal"
		});
		
	});
})(jQuery);
/************ CUSTOM SCROLL (21AGST2017) *************/
/************ ROUND CIRCLE (21AGST2017) *************/
$(document).ready(function () {
	$("#shape").roundSlider({
		value:70,
		readOnly:"true",
		circleShape:'half-top',	
		sliderType: "min-range"
	});
	$(".dash-rng-hd .rs-tooltip").text("$75000");
	$(".crcl-bx-prgrs .rs-tooltip").html("<div class='mnth-bx'>$250<sub>PM</sub></div>");
});
function sliderShapeChanged(e) {
	var options = { circleShape: e.value };
	if (e.value == "pie") options["startAngle"] = 0;
	else if (e.value == "custom-quarter" || e.value == "custom-half") options["startAngle"] = 45;
	$("#shape").roundSlider(options);
}
/************ /ROUND CIRCLE (21AGST2017) *************/
/************ APPLICANT SHOW HIDE (28AGST2017) *************/
jQuery(".ap-btn").click(function() {
    jQuery(".aplcnt-qus").toggle();
});
/************ /APPLICANT SHOW HIDE (28AGST2017) *************/