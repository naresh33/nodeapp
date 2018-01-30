var iotf = require("ibmiotf");
var fs = require("fs");

var config = {
    "org" : "23lpdf",
    "type" : "VehicleAssetTrackingDevice",
    "id" : "AssetDevice1",
    "auth-method" : "token",
    "auth-token" : "*++P4!pFqVMPhQSbW&"   
};

var deviceClient = new iotf.IotfDevice(config);

deviceClient.log.setLevel('debug');

deviceClient.connect();

deviceClient.on('connect', function(){
   console.log("connected");

   var events = fs.readFileSync('./events').toString().split('\n');
	var count = 0;

	setInterval(function function_name (argument) {
		payload = events[count++];

		if(count === events.length ) {
			count = 0;
		}
		if(deviceClient.isConnected) {
			console.log("Publishing data : "+payload);
			deviceClient.publish("vehicle","json",payload); 
		}
	}, 2000);
   });

deviceClient.on("error", function (err) {
    console.log("Error : "+err);
});