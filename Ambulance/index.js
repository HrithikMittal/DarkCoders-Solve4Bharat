var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var request = require("request");
var MongoClient = require("mongodb").MongoClient;
var ObjectID = require('mongodb').ObjectID;
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.set("view engine", "ejs");
app.use(express.static("public"));

url = "mongodb://localhost:27017/iisc";

// Todo:get details from Cookies

app.get("/requests/:id/completed", function(req, res) {
    var idup = req.params.id;
    var query = {_id:idup};
    MongoClient.connect(url,function(err,db)
    {
        if(err) throw err;
        var dbo = db.db("iisc");
        dbo.collection("ambulancedetails").update({_id:ObjectID(idup)},{$set:{isCompleted:"1"}},function(err,ress)
        {
          if(err) throw err;
          res.redirect("/");
        });
    });
});
MongoClient.connect(url, (err, db) => {
  const dbo = db.db("iisc");

  //API Routes
  var router = express.Router();

  // Route to view all the requests
  app.get("/", function(req, res) {
    dbo
      .collection("ambulancedetails")
      .find({})
      .toArray(function(err, result) {
        if(err) throw err;
        //console.log(result);
        res.render("viewall", {
          title: "View all requests",
          data: result
        });
      });
  });

  //post route for completed update
  
});
app.listen("3004", "127.0.0.1", function() {
  console.log("Server is listening on port 3004!");
});
