var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var request = require("request");
var MongoClient = require("mongodb").MongoClient;
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.set("view engine", "ejs");
app.use(express.static("public"));

url = "mongodb://localhost:27017/";
// Todo:get details from Cookies

MongoClient.connect(url, (err, db) => {
  const dbo = db.db("devsoc");

  //API Routes
  var router = express.Router();
  // Index page route
  app.get("/", function(req, res) {
    res.render("index", {
      title: "Emergency!"
    });
  });

  //Confirmation page route
  app.get("/requests/success", function(req, res) {
    res.render("success", {
      title: "Emergency request submitted successfully!"
    });
  });
  //Failed page route
  app.get("/requests/failed", function(req, res) {
    res.render("failed", {
      title: "Some error occured!"
    });
  });

  // Route to view all the requests
  app.get("/requests/view", function(req, res) {
    dbo
      .collection("ambulancedetail")
      .find({})
      .toArray(function(err, allDetils) {
        res.render("viewall", {
          title: "View all requests",
          data: allDetils
        });
      });
  });

  // Post request with the details of the emergency and using the Google Maps API to get location details
  app.post("/requests/new", function(req, res) {
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var PatientNo = req.body.PatientNo;
    // take patientNo  from the cookies
    console.log(latitude);
    console.log(longitude);
    console.log(PatientNo);
    console.log(typeof PatientNo);
    var url =
      "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
      latitude +
      "," +
      longitude +
      "&sensor=true&key=AIzaSyACjEFG5Hufa0S1NlDL1IH0bphLn334Ciw";
    request(url, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var locationDetails = JSON.parse(body);
        locationName = locationDetails["results"][0]["formatted_address"];
        console.log(`${locationName}`);
        dbo
          .collection("details")
          .find({})
          .toArray(function(err, result) {
            if (err) throw err;
            else {
              for (i = 0; i < result.length; i++) {
                if (result[i].PatientNo == PatientNo) {
                  var data = {
                    name: result[i].PatientName,
                    age: result[i].PatientAge,
                    phone: result[i].PatientNo,
                    sex: result[i].PatientSex,
                    location: locationName,
                    completed: 0,
                    diseaseHistory: result[i].PatientDisease
                  };
                  console.log(data);
                  dbo
                    .collection("ambulancedetail")
                    .insertOne(data, function(err, res) {
                      if (err) throw err;
                      console.log("1 document inserted");
                    });
                }
              }
            }
          });
      } else {
        console.log(err);
      }
      res.render("success", { title: "Success" });
    });
  });
});
app.listen("3003", "127.0.0.1", function() {
  console.log("Server started on port 3003");
});

// Google Maps API Key: AIzaSyACjEFG5Hufa0S1NlDL1IH0bphLn334Ciw
