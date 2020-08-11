var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var Campground = require("./../models/campgrounds");

mongoose.connect("mongodb://localhost:27017/yelpcamp", {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Campground.create(
//   {
//     name: "Llogara, Dhermi View", 
//     image: "https://images.squarespace-cdn.com/content/v1/57b9b98a29687f1ef5c622df/1497187214347-VQS90CW3BIU44LS8YRN5/ke17ZwdGBToddI8pDm48kNub02L0uULUCOuILx7ZxY8UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcYApxGE1ZEVFHy9_t5q5kQLGegzyj9kger3C3iinxUowEpV9f-KiSqcIke-dO9nIh/Llogara+Pass+Albania?format=1500w",
//     description:"Outstanding view from Llogara (Albania)"
//   }, function(err, campground){
//     if(err){
//       console.log("error");
//     } else {
//       console.log("newly creared campground!!");
//       console.log(campground);
//     };
//   });





app.get("/", function(req,res){
  res.render("landing");
});

// INDEX show all campgrounds
app.get("/campgrounds", function(req, res){
   // Get all cmapgrounds from DB
   Campground.find({}, function(err, allCampgrounds){
      if(err){
        console.log(err);
      }else {
        res.render("index",{campgrounds:allCampgrounds});
      }
   });
  
});

// NEW show form to create a new campground
app.get("/campgrounds/new", function(req, res){
   res.render("new.ejs")
})

// CREATE add a new campground to DB
app.post("/campgrounds", function(req, res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = {name: name, image:image, description: description}
//  create a newCampground and save to DB 
Campground.create(newCampground, function(err, newlyCreated){
  if(err){
    console.log(err);
   } else {
     // redirect to campgrounds page  
     res.redirect("/campgrounds");
   }
})
  
});
// SHOW - show more info about one campground
app.get("/campgrounds/:id", function(req, res){
  // find the campground with the provided id
  Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
         console.log(err)
       } else {
       //  render show template with that campground
        res.render("show", {campground: foundCampground});
       }
  });
  req.params.id
 
});



app.listen(6060, function(){
    console.log("It's working!!!")
});