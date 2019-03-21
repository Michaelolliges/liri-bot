require('dotenv').config()
var keys = require("./keys.js");


console.log(process.argv);

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify)
console.log(keys);

var command = process.argv[2] || 'spotify-this-song';
var songSearch =  process.argv.slice(3).join(" ") || "99 problems";
var movieSearch = "mr nobody"
var artist = "metallica"
console.log("search: ", songSearch);
console.log("command: ", command);

if (command === 'spotify-this-song') {
  console.log("Acquiring song info...")
  getSong();
}
// defaulting to "these eyes"
if (command === 'movie-this') {
  getMovie();
}
if (command === 'concert-this'){
  getConcert();
}
function getSong() {
  spotify.search({ type: 'track', query: songSearch }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    console.log(JSON.stringify(data, null, 2));
  });
}

function getMovie() {
  var request = require("request");
  var queryUrl = "http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=trilogy";

  console.log("URL: " + queryUrl);

  request(queryUrl, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);

    }
  });

}

function getConcert() {
  var request = require("request");
  var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  console.log("URL: " + queryUrl);

  request(queryUrl, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      console.log(JSON.parse(body));
      console.log("Venue: " + JSON.parse(body).Venue);
      // console.log("Location: " + JSON.parse(body).venue);
      // console.log("Date: " + JSON.parse(body).datetime);
      

    }
  });

}

