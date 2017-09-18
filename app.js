// app.js
var exphbs = require("express-handlebars");
var express = require("express");
var app = express();
// var https = require("https");
var giphy = require("giphy-api")();

// Engine and styling initialization
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use(express.static("public"));

// Get requests
app.get("/hello-gif", function(req, res) {
  var gifUrl = "https://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif"
  res.render("hello-gif", {gifUrl: gifUrl});
});

app.get("/greetings/:name", function(req, res) {
  var name = req.params.name;
  res.render("greetings", {name: name});
});

app.get("/hello-squirrel", function(req, res) {
  res.send("Hello squirrel!");
});

// Get request: Require HTTPS Module
app.get("/", function(req, res) {
  console.log(req.query);
  var queryString = req.query.term;
  var term = encodeURIComponent(queryString);
  var url = "https://api.giphy.com/v1/gifs/search?q=" + term + "&api_key=dc6zaTOxFJmzC";

  https.get(url, function(response) {
    response.setEncoding("utf-8");

    var body = "";

    response.on("data", function(d) {
      body += d;
    });

    response.on("end", function() {
      var parsed = JSON.parse(body);
      res.render("home", {gifs: parsed.data});
    })
  })

    giphy.search(req.query.term, function(err.response) {
      res.render("home", {gifs: response.data});
    });
})

// App listening
app.listen(3000, function() {
  console.log("Example app listening on port 3000");
});
