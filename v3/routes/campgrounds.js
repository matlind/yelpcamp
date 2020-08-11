var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware")
// INDEX show all campgrounds
router.get("/campgrounds", function(req, res){
    // Get all cmapgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
         console.log(err);
       }else {
         res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser: req.user});
       }
    });
   
 });
 
 // NEW show form to create a new campground
 router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new")
 })
 
 // CREATE add a new campground to DB
 router.post("/campgrounds", middleware.isLoggedIn, function(req, res){
   // get data from form and add to campgrounds array
   var name = req.body.name;
   var price = req.body.price;
   var image = req.body.image;
   var description = req.body.description;
   var author = {
     id: req.user._id,
     username: req.user.username
   }
   var newCampground = {name: name, price: price, image:image, description: description, author: author}

 //  create a newCampground and save to DB 
 Campground.create(newCampground, function(err, newlyCreated){
   if(err){
     console.log(err);
    } else {
      // redirect to campgrounds page 
      console.log(newlyCreated);
      res.redirect("/campgrounds");
    }
 })
   
 });
 // SHOW - show more info about one campground
 router.get("/campgrounds/:id", function(req, res){
   // find the campground with the provided id
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
          console.log(err)
        } else {
          console.log(foundCampground);
        //  render show template with that campground
         res.render("campgrounds/show", {campground: foundCampground});
        }
   });
   req.params.id
  
 });

//  EDIT CAMPGROUND ROUTE
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err,foundCampground){
    res.render("campgrounds/edit",{campground: foundCampground});
    });
  });

// UPDATE CAMPGROUND ROUTE
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
  // find and update the correct campground
  
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if(err){
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
  // redirect somewhere(show page)
});

// DESTROY CAMPGROUND ROUTE
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function (req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
        res.redirect("/campgrounds");
      } else {
        res.redirect("/campgrounds");
      }
    })   
});


 

 module.exports = router;