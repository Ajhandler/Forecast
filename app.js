var https = require("https");

function printMessage(){

}

var req = https.get("https://api.forecast.io/forecast/3d1e384b72f8aa1265b95324b43cbd27/37.8267,-122.423", function(res){
	var weather = "";

	res.on('data', function(chunk){
		weather += chunk;
		console.log(weather)
	})
});