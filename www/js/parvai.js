//Device Ready Event
document.addEventListener("deviceready", onDeviceReadyAction, false);
function onDeviceReadyAction() {

	// Manage Ad
	initializeAd();

	//Handle Menu 
	$( "#setting-cntrl" ).click(function() {
		if($("#setting").is(":visible")) {
			$("#setting").hide();
		} else {
			$("#setting").show(100);
		}
	});


	$("body").click ( function(e) {
    	if(e.target.className !== "setting-link" && e.target.className !== "setting-control") {
			$("#setting").hide();
    	}
  	});

}	


function initializeAd() {

	admob.initAdmob("ca-app-pub-8708216095485435/6236855704","ca-app-pub-8708216095485435/7713588907");
    document.addEventListener(admob.Event.onInterstitialReceive, onInterstitialReceive, false);
    document.addEventListener(admob.Event.onInterstitialFailedReceive,onReceiveFail, false);
    document.addEventListener(admob.Event.onBannerFailedReceive,onReceiveFail, false);

	//var admobParam=new  admob.Params();
	//admobParam.extra={'keyword':"admob phonegame"};
	//admobParam.isForChild=true;
    //admobParam.isTesting=true;
    admob.showBanner(admob.BannerSize.BANNER, admob.Position.BOTTOM_CENTER, null);

    admob.cacheInterstitial();

}


//Load AdMob Interstitial Ad
function showInterstitial(){
    admob.isInterstitialReady(function(isReady){
        if(isReady){
            admob.showInterstitial();
        }
    });
}

function onInterstitialReceive (message) {
    //alert(message.type + " ,you can show it now");
}

function onReceiveFail (message) {
	if(admob) {
	 	var msg=admob.Error[message.data];
	    if(msg==undefined){
	       msg=message.data;
	    }
	    console.log("load fail: " + message.type + "  " + msg);
	}
} 


//Share the app link with user
function share() {
	window.plugins.socialsharing.share('Try this great App - ', 'Tamil Payanam',null,'https://play.google.com/store/apps/details?id=com.career.wrap.tamil.payanam');
	hidePopup();
}

//Provide Feedback
function feedback() {
	window.plugin.email.open({
		to:      ['mail2passionwings@gmail.com'],
		subject: 'Feedback on Tamil Payanam',
		body:    '',
		isHtml:  true
	});
	hidePopup();
}

//Rate App
function rate() {
	var version = device.platform;
	hidePopup();
	if(version == "Android") {
		var url = "market://details?id=com.career.wrap.tamil.payanam";
        window.open(url,"_system");		
	} else {
		//var url = "https://play.google.com/store/apps/details?id=com.smart.droid.telugu.tips"
	}
}

function hidePopup() {
	$("#setting").hide();	
}
