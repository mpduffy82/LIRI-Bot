require("dotenv").config();

// GET PACKAGES
// Get the Axios package
var axios = require("axios");
// get the Spotify package
var Spotify = require('node-spotify-api');
// get the moment package
var moment = require('moment');
// Gets the myBands object from the bands file.
var data = require("./keys.js");
// Get the Fs package
var fs = require("fs-extra");

// get spotify id and secret
var spotifyID = data.spotify.id;
var spotifySecret = data.spotify.secret;

// get user request
var request = process.argv[2];

// get user value
var userArray = process.argv;
var userValuePlus = "";
var userValue = "";
for (i = 3; i < userArray.length; i++) {
  if (userArray[i] === "undefined") {
    break;
  }
  else {
    if (i === 3) {
      userValuePlus += userArray[i];
      userValue += userArray[i];

    }
    else {
      userValuePlus += "+" + userArray[i];
      userValue += " " + userArray[i];
    }
  }
}

function concertThis() {
  axios.get("https://rest.bandsintown.com/artists/" + userValuePlus + "/events?app_id=codingbootcamp")
    .then(function (response) {
      // console.dir(response.data);
      for (i = 0; i < response.data.length; i++) {
        console.log("Venue Name: " + response.data[i].venue.name);
        console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
        console.log("Date: " + moment(response.data[i].datetime).format('MMMM Do YYYY, h:mm:ss a'));
        console.log("---------------------------------------------------------------");

        // append to file
        fs.appendFile("log.txt", 
        "Venue Name: " + response.data[i].venue.name + "\n" +
        "Location: " + response.data[i].venue.city + "\n" +
        "Date: " + moment(response.data[i].datetime).format('MMMM Do YYYY, h:mm:ss a') + "\n"
        , function(err) {
          if (err) {
            return console.log(err);
          }
        });
      }
    })
}

function movieThis() {
  if (process.argv[3] === undefined) {
    // Then run a request with axios to the OMDB API with the movie specified
    axios.get("http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy").then(
      function (response) {
        console.log("\nMovie Title: " + response.data.Title);
        console.log("\nYear of Release: " + response.data.Year);
        console.log("\nThe IMDB rating for this movie: " + response.data.imdbRating);
        console.log("\nRotten Tomatoes rating for the movie: " + response.data.Ratings[1].Value);
        console.log("\nCountry where the movie was produced: " + response.data.Country);
        console.log("\nLanguage of the movie: " + response.data.Language);
        console.log("\nPlot of the movie: " + response.data.Plot);
        console.log("\nActors in the movie: " + response.data.Actors);
        console.log("---------------------------------------------------------------");

        // append to file
        fs.appendFile("log.txt", 
        "\nMovie Title: " + response.data.Title + "\n" +
        "\nYear of Release: " + response.data.Year + "\n" +
        "\nThe IMDB rating for this movie: " + response.data.imdbRating + "\n" +
        "\nRotten Tomatoes rating for the movie: " + response.data.Ratings[1].Value + "\n" +
        "\nCountry where the movie was produced: " + response.data.Country + "\n" +
        "\nLanguage of the movie: " + response.data.Language + "\n" +
        "\nPlot of the movie: " + response.data.Plot + "\n" +
        "\nActors in the movie: " + response.data.Actors + "\n" +
        "---------------------------------------------------------------"

        , function(err) {
          if (err) {
            return console.log(err);
          }
        })
      }
    );
  }
  else {
    // Then run a request with axios to the OMDB API with the movie specified
    axios.get("http://www.omdbapi.com/?t=" + userValuePlus + "&y=&plot=short&apikey=trilogy").then(
      function (response) {

        console.log("\nMovie Title: " + response.data.Title);
        console.log("\nYear of Release: " + response.data.Year);
        console.log("\nThe IMDB rating for this movie: " + response.data.imdbRating);
        console.log("\nRotten Tomatoes rating for the movie: " + response.data.Ratings[1].Value);
        console.log("\nCountry where the movie was produced: " + response.data.Country);
        console.log("\nLanguage of the movie: " + response.data.Language);
        console.log("\nPlot of the movie: " + response.data.Plot);
        console.log("\nActors in the movie: " + response.data.Actors);
        console.log("\n---------------------------------------------------------------");

        // append to file
        fs.appendFile("log.txt", 
        "\nMovie Title: " + response.data.Title + "\n" +
        "\nThe IMDB rating for this movie: " + response.data.imdbRating + "\n" +
        "\nRotten Tomatoes rating for the movie: " + response.data.Ratings[1].Value + "\n" +
        "\nCountry where the movie was produced: " + response.data.Country + "\n" +
        "\nLanguage of the movie: " + response.data.Language + "\n" +
        "\nPlot of the movie: " + response.data.Plot + "\n" +
        "\nActors in the movie: " + response.data.Actors + "\n" +
        "---------------------------------------------------------------"

        , function(err) {
          if (err) {
            return console.log(err);
          }
        })
      }
    );
  }
}

function spotifyThis() {
  var spotify = new Spotify({
    id: spotifyID,
    secret: spotifySecret
  });

  if (process.argv[3] === undefined) {
    if (process.argv[2] === "do-what-it-says") {
      // if random request called
      fs.readFile("random.txt", 'utf8', function (err, data) {
        if (err) throw err;
      
        spotify.search({ type: 'track', query: data }, function (err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          }
          for (i = 0; i < 5; i++) {
            console.log("\nSong Name: " + data.tracks.items[i].name);
            console.log("\nArtists: " + data.tracks.items[i].artists[0].name);
            console.log("\nUrl Link: " + data.tracks.items[i].external_urls.spotify);
            console.log("\nAssociated Album: " + data.tracks.items[i].album.name);
            console.log("\n---------------------------------------------------------------");

            // append to file
            fs.appendFile("log.txt", 
            "\nSong Name: " + data.tracks.items[i].name + "\n" +
            "\nArtists: " + data.tracks.items[i].artists[0].name + "\n" +
            "\nUrl Link: " + data.tracks.items[i].external_urls.spotify + "\n" +
            "\nAssociated Album: " + data.tracks.items[i].album.name + "\n" + 
            "---------------------------------------------------------------"

            , function(err) {
              if (err) {
                return console.log(err);
              }
            })
          }
        });

      });
    }
    else {

      spotify.search({ type: 'track', query: "Monday Morning Ant Brigade" }, function (err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log("\nSong Name: " + data.tracks.items[0].name);
        console.log("\nArtists: " + data.tracks.items[0].artists[0].name);
        console.log("\nUrl Link: " + data.tracks.items[0].external_urls.spotify);
        console.log("\nAssociated Album: " + data.tracks.items[0].album.name);
        console.log("\n---------------------------------------------------------------");

         // append to file
         fs.appendFile("log.txt", 
         "\nSong Name: " + data.tracks.items[i].name + "\n" +
         "\nArtists: " + data.tracks.items[i].artists[0].name + "\n" +
         "\nUrl Link: " + data.tracks.items[i].external_urls.spotify + "\n" +
         "\nAssociated Album: " + data.tracks.items[i].album.name + "\n" +
         "---------------------------------------------------------------"
         , function(err) {
           if (err) {
             return console.log(err);
           }
         })
      });
    }
  }
  else {

    spotify.search({ type: 'track', query: userValue }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      for (i = 0; i < 5; i++) {
        console.log("\nSong Name: " + data.tracks.items[i].name);
        console.log("\nArtists: " + data.tracks.items[i].artists[0].name);
        console.log("\nUrl Link: " + data.tracks.items[i].external_urls.spotify);
        console.log("\nAssociated Album: " + data.tracks.items[i].album.name);
        console.log("\n---------------------------------------------------------------");

         // append to file
         fs.appendFile("log.txt", 
         "\nSong Name: " + data.tracks.items[i].name + "\n" +
         "\nArtists: " + data.tracks.items[i].artists[0].name + "\n" +
         "\nUrl Link: " + data.tracks.items[i].external_urls.spotify + "\n" +
         "\nAssociated Album: " + data.tracks.items[i].album.name + "\n" +
         "---------------------------------------------------------------"
         , function(err) {
           if (err) {
             return console.log(err);
           }
         })
      }
    });
  }
}
// if the user requests the Band Is In Town Artist Events API
if (request === "concert-this") {
  concertThis();
}

// if the user requests the OMDB api
if (request === "movie-this") {
  movieThis();
}

// if user requests the spotify API
if (request === "spotify-this") {
  spotifyThis();
}

// if the user requests FS
if(request === "do-what-it-says"){
  spotifyThis();
}