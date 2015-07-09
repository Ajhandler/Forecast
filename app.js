var https = require("https");

function printMessage(weather){
	console.log("the temperature is currently " + weather);
}

function printError(error){
	console.log(error.message)
}

// Connect to the forecast api
var req = https.get("https://api.forecast.io/forecast/3d1e384b72f8aa1265b95324b43cbd27/37.8267,-12f2.423", function(res){
	var body = "";
	//read data
	res.on('data', function(chunk){
		body += chunk;
	});
	res.on('end',function(){
		if(res.statusCode === 200){
			try{
				//parse the data
				var weather = JSON.parse(body);
				//print the data
				printMessage(weather.currently.temperature)
			} catch(error){ //if there was an error print it
				printError(error)
			}

			} else {
				printError({message: "the location you specified does not exist"}) //if user typed in bad location, tell them!
			}
	});
});