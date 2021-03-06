var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware")



// Comments New

router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req, res){
    // find campground by ID
    Campground.findById(req.params.id, function(err, campground){
      if(err) {
        console.log(err);
      } else {
        res.render("comments/new", {campground: campground})
      }
    })
  });
//   Comments Create
  router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req,res){
    // lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
      if(err) {
        console.log(err);
        res.redirect("/campgrounds");
      } else {
       console.log(req.body.comment);
        Comment.create(req.body.comment, function(err, comment){
            if(err){
              req.flash("error", "Something went wrong")
              console.log(err);
            } else {
              //  add user name and id to comment
              comment.author.id = req.user._id;
              comment.author.username = req.user.username;
              // save the comment
              comment.save();
              campground.comments.push(comment);
              campground.save();
              console.log(comment);
              req.flash("error", "Susscessfully added comment!")
              res.redirect("/campgrounds/" + campground._id);
            }
          });
      }
    });
});

// comment edit route
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res ){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
      res.redirect("back");
    } else {
      res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
    }
  });
 });

//  Comment update 
router.put("/campgrounds/:id/comments/:comment_id/", middleware.checkCommentOwnership, function (req,res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err) {
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id );
    }
  });
});
// COMMENT DESTROY ROUTE
router.delete("/campgrounds/:id/comments/:comment_id/", middleware.checkCommentOwnership, function (req,res){
  // findByIdAndRemove
Comment.findByIdAndRemove(req.params.comment_id, function(err){
  if(err){
    res.redirect("back");
  } else {
    req.flash("error", "Comment deleted")
    res.redirect("/campgrounds/" + req.params.id);
  }
});
});

  

  module.exports = router;




  // Campground Destroy Route: /campgrounds/:id
  // Cpmment Destry Route:   /campgrounds/:id/comments/:comment_id