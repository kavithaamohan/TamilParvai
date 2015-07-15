document.addEventListener('deviceready', onDeviceReady, true);
var pushNotification;

function onDeviceReady() {

	try {
		pushNotification = window.plugins.pushNotification;
		$("#app-status-ul").append('<li>registering ' + device.platform + '</li>');
		if (device.platform == 'android' || device.platform == 'Android' ||
			device.platform == 'amazon-fireos') {
			pushNotification.register(successHandler, errorHandler, {
				"senderID" : "939912551549",
				"ecb" : "onNotification"
			}); // required!
		} else {
			pushNotification.register(tokenHandler, errorHandler, {
				"badge" : "true",
				"sound" : "true",
				"alert" : "true",
				"ecb" : "onNotificationAPN"
			}); // required!
		}
	} catch (err) {
		txt = "There was an error on this page.\n\n";
		txt += "Error description: " + err.message + "\n\n";
		alert(txt);
	}
}

// handle APNS notifications for iOS
function onNotificationAPN(e) {
	if (e.alert) {
		//$("#app-status-ul").append('<li>push-notification: ' + e.alert + '</li>');
		// showing an alert also requires the org.apache.cordova.dialogs plugin
		navigator.notification.alert(e.alert);
	}

	if (e.sound) {
		// playing a sound also requires the org.apache.cordova.media plugin
		var snd = new Media(e.sound);
		snd.play();
	}

	if (e.badge) {
		pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
	}
}

// handle GCM notifications for Android
function onNotification(e) {
	switch (e.event) {
	case 'registered':
		if (e.regid.length > 0) {
			if(e.regid) {
				registerDevice(e.regid);
			}	
		}
		break;

	case 'message':
		// if this flag is set, this notification happened while we were in the foreground.
		// you might want to play a sound to get the user's attention, throw up a dialog, etc.
		if (e.foreground) {
			$("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');

			// on Android soundname is outside the payload.
			// On Amazon FireOS all custom attributes are contained within payload
			//var soundfile = e.soundname || e.payload.sound;
			// if the notification contains a soundname, play it.
			// playing a sound also requires the org.apache.cordova.media plugin
			//var my_media = new Media("/android_asset/www/" + soundfile);

			//my_media.play();
		} else { // otherwise we were launched because the user touched a notification in the notification tray.
			if (e.coldstart)
				$("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
			else
				$("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
		}
		//console.log(e.payload.message);
		$("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
		$("#app-status-ul").append('<li>MESSAGE -> URL: ' + e.payload.url + '</li>');
		//downloadLatestTips();

		//var controllerScope = angular.element($('body')).scope();
		//controllerScope.$apply(function() {
			//console.log('Take to Tip => ' + e.payload.id);
			var landingPath = "#/article/" + e.payload.id;
			//setInterval(function () {window.location = landingPath}, 6000);
			window.location = landingPath;
			//this.tipId = e.payload.id;
		//});		
		//angular.element($('body')).scope().loadTip(e.payload.id);
		//$location.path(landingPath);
		//navigator.notification.alert(e.payload.message, alertDismissed, '\u0baa\u0bc1\u0ba4\u0bbf\u0baf //\u0ba4\u0bc1\u0bb3\u0bbf\u0b95\u0bb3\u0bcd', 'ok');
		// Android / BlackBerry WebWorks (OS 5.0 and higher) / iOS / Tizen
		function alertDismissed() {
			// do something
		}
		
		//android only
		//$("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
		//amazon-fireos only
		//$("#app-status-ul").append('<li>MESSAGE -> TIMESTAMP: ' + e.payload.timeStamp + '</li>');
		break;

	case 'error':
		$("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
		break;

	default:
		$("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
		break;
	}
}

function tokenHandler(result) {
	//$("#app-status-ul").append('<li>token: ' + result + '</li>');
	// Your iOS push server needs to know the token before it can push to this device
	// here is where you might want to send it the token for later use.
}

function successHandler(result) {
	$("#app-status-ul").append('<li>success:' + result + '</li>');
}

function errorHandler(error) {
	//$("#app-status-ul").append('<li>error:' + error + '</li>');
}


// Your GCM push server needs to know the regID before it can push to this device
//Send the regid to the GSM Server
function registerDevice(regId) {
	var url = "http://smartdroidies.com/tamilpayanam/gcm/register.php";
	//console.log("Device ID : " + device.uuid)
	$.post( url, { dName: device.name, dcordova: device.cordova, dplatform: device.platform, duuid: device.uuid, dversion:device.version, dmodel:device.model, regid: regId});
}