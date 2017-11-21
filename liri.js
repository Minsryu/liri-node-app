/////////////////////////////////////

var twitterKey = require("./keys.js");
var Twitter = require("twitter");
var params = {screen_name: "PlayHearthstone"};
var client = new Twitter(twitterKey);

/////////////////////////////////////
var Spotify = require("node-spotify-api");
var request = require("request");
var spotify = new Spotify({
	  id: "1f134f4ea4f94732b34a918515dacf8a",
	  secret: "4e8e567f760a41febb1172a58426911a"
	});
/////////////////////////////////////
var fs= require("fs");

/////////////////////////////////////

var command = process.argv[2];
var search = process.argv
search.splice(0,3);
search = search.join("+");

doThis(command);


function doThis(command){

	switch(command){
		case "my-tweets":
			twitterCall();
			break;

		case "spotify-thissong":

			if(search){
			spotifyCall(search);
			break;
			}
			else{
			spotifyCall("the+sign+ace+base");
			break;
			}
			
		case "movieInfo":
			if (search) {
			movieInfo(search);
			break;
			}
			else{
			movieInfo("mr+nobody");	
			break;
			}
		case "do-what-it-says":
			doWhatItSays();
			break;		
	};
}

function twitterCall(){

	client.get("statuses/user_timeline", params, function(error, tweets, response) {
	  if(!error){
	  	for (var i=0;i<tweets.length;i++){
	  		console.log("-------"+i+"-------------------- ");
	  		console.log(tweets[i].created_at);
	  		console.log(tweets[i].text);
	  		console.log("--------------------------- ");
	  		console.log("");
	  		if(i===21){
	  			break;
	  		}
	  	}
	  }
	});
}


function spotifyCall(search){

	spotify.search({type:"track", query:search, limit:"1"},function(err,data){
		if (err){
			return console.log("Error occurred: " + err);
		}
		// console.log(JSON.stringify(data.tracks,null,2));

		console.log(data.tracks.items[0].artists[0].name);
		console.log(data.tracks.items[0].name);
		console.log(data.tracks.items[0].preview_url);
		console.log(data.tracks.items[0].album.name);

	});
}

function movieInfo(search){

	
	var omdbUrl = "http://www.omdbapi.com/?t="+search+"&apikey=trilogy"

	request(omdbUrl,function(error,response,body){

		body = JSON.parse(body)
		
		console.log(body.Title);
		console.log(body.Year);
		console.log("IMDB Rating: "+body.Ratings[0].Value);
		if (body.Ratings[1]){
		console.log("Tomato Rating: "+body.Ratings[1].Value);
		}
		else{
		console.log("Tomato Rating: N/A");
		}
		console.log(body.Country);
		console.log(body.Language);
		console.log(body.Plot);
		console.log(body.Actors);

		});

}


function doWhatItSays(){

	fs.readFile("random.txt","utf8",function(error,data){
		if(error){
			return console.log(error);
		}
		var input = data.split(",");
		command = input[0];
		search = input[1].replace(/\"/g,"").replace(/\s/g,"+");

		if (command === "do-what-it-says"){
			return;
		}
		else{
		doThis(command);
		// search = search.join("+");
		}
	})
}
	
	















