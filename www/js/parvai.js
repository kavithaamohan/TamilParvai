//Device Ready Event
document.addEventListener("deviceready", onDeviceReadyAction, false);
function onDeviceReadyAction() {

	// Manage Ad
	initializeAd();

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
