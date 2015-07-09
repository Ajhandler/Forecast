var https = require("https");
var zip = process.argv[2];

function printMessage(weather){
	console.log("the temperature is currently " + weather);
}

function printError(error){
	console.log(error.message)
}

function getWeather(lat,lng){
	//Connect to the forecast api
	var req = https.get("https://api.forecast.io/forecast/3d1e384b72f8aa1265b95324b43cbd27/"+lat+","+lng, function(res){
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
	}


var gReq = https.get("https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:"+zip+"&key=AIzaSyDrUf2oguwPHui3IE4F6AaUbbaSgOAyE3U",
	function(res){
		var body = "";
		res.on('data',function(chunk){
			body += chunk
		});
		res.on('end',function(){
			var location = JSON.parse(body)
			//catch and assign lat and long vars
			var lat = location.results[0].geometry.location.lat
			var lng = location.results[0].geometry.location.lng
			
			getWeather(lat,lng)
		});
	});
