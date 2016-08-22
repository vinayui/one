
$(document).ready(function() {
	
	var data = {
			"offer": {
			    "apr": '10.5',
			    "expiry_date": '5th Jan, 2017'
			  },
			"userInfo" : {
				"name" : "CF Frost"
			},
			"cardDetails" : {
				"cardIcon" : "https://icm.aexp-static.com/Internet/Acquisition/US_en/AppContent/CreditCards/img/Comparecards/chg_gold_premr_rwds_176x111.gif",
				"type" : "American Express Gold Card",
				"endNumber" : "23002",
				"holderName" : "C F Frost"
			},
			"error" : "Due to Error we are not proceding"
	}
	
	// Dust templates from ICM
	var icmDynamicData = {
	  terms_conditions: 'This terms and condition is for {name} card',
	  offer_details: 'Your ARP is {apr} and your offer expiration date is {expiry_date}.'
	}
	
	 var isMobile = window.matchMedia("only screen and (max-width: 760px)");
	
	
		//render layout
		dust.render('layout', data, function(err, result) {
			$("#app-oneclick").html(result);
		});
		
		//render head
		dust.render('head', data, function(err, result) {
			$("#headsection").html(result);
		});
		
		//render card details
		dust.render('card', data, function(err, result) {
			$("#cardinfo").html(result);
		});	
		
		//render enroll details
		dust.render('enroll', data, function(err, result) {
			$("#enrolldetails").html(result);
		});
		
		//render agreement details
		dust.render('agreement', data, function(err, result) {
			$("#agreementdetails").html(result);
		});
		
		//render agreement details
		dust.render('electronic', data, function(err, result) {
			$("#electronicsection").html(result);
		});
		
		//render offer details
		dust.render('offer', data, function(err, result) {
			$("#offersection").html(result);
		});
		
		dust.renderSource(icmDynamicData.terms_conditions, data.userInfo, function(err, tc) {
		  if (tc)
			 $("#electDiv").find('p').html(tc);
		});
		dust.renderSource(icmDynamicData.offer_details, data.offer, function(err, od) {
		  if (od)
		    $('#offerDiv').find('p').html(od);
		});
	
	
	
	$('input:checkbox').click(function(){
		$('#enrollBtn').prop({disabled : false});
		$('input:checkbox').each(function( index ) {
			  if( !$( this ).is(':checked') ){
				  $('#enrollBtn').prop({disabled : true});
				  return;
			  }
		});
		//debugger;
	});
	
	 $('.expand-collaps, .consent').click(function (event) {
		 var _this = this;
		 if(this.className == "consent"){
			 _this = $(this).closest( "div.reviewed-checkbox" ).next('div').find('.expand-collaps'); 
		 }
		 
		 if(isMobile.matches){
			 openPopup(_this);
			 return;
		 }
		 
		 
		 $(_this).toggleClass('active');
	     $(_this).next('div.content-section').slideToggle('slow');
	     if($(_this).hasClass('active')){
           $(_this).find('button').text('-');
           $(_this).find('span').text('Hide Disclosure');
	     }else{
           $(_this).find('button').text('+');
           $(_this).find('span').text('Show Disclosure');
	     }
	 });
	
	 $('.pirnt').click(function (event) {
		 var id = $(this).closest('div.heading-content').next('div.content').prop('id');
		  printDiv(id);
	 });
	 
	 
	 var pdfdoc = new jsPDF();
	 var specialElementHandlers = {
	     '#editor': function (element, renderer) {
	         return true;
	     }
	 };
	 $('.save').click(function (event) {
		 var el = $(this).closest('div.heading-content').next('div.content');
		 pdfdoc.fromHTML($(el).html(), 15, 15, {
	        'width': 170,
	            'elementHandlers': specialElementHandlers
	    });
		 pdfdoc.save('offerdetails.pdf');
	 });
	 $("body").append("<div id='print-me'></div>");

	

	 
	 //----- OPEN
	 function openPopup(el){
	   
		 $(".popup .popup-content").html($(el).next().find('.content').html());
		 
		 // $('[data-popup-open]').on('click', function(e)  {
	       // var targeted_popup_class = jQuery(this).attr('data-popup-open');
	        $('[data-popup="popup-1"]').fadeIn(350);
	        e.preventDefault();
	   // });
	 };
	    //----- CLOSE
	    $('[data-popup-close]').on('click', function(e)  {
	        var targeted_popup_class = jQuery(this).attr('data-popup-close');
	        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
	 
	        e.preventDefault();
	    });


});

function printDiv(ele){

	$("#"+ele).clone().appendTo("#print-me");
    $("body").addClass("printing");
    window.print();
    $("body").removeClass("printing");
    $("#print-me").empty();

}

// Query String Parsing
var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();


