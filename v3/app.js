var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var Campground = require("./models/campground");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds");


// requiring routes  
var commentRoutes = require("./routes/comments");
var campgroundsRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

// ("mongodb://localhost:27017/yelpcamp",{useNewUrlParser: true, useUnifiedTopology: true });
// yelpcamp-shard-00-01-ui8fw.mongodb.net:27017
mongoose.connect("mongodb+srv://Service:123456aaa@yelpcamp-ui8fw.mongodb.net/yelpcamp?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true })

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
app.use(flash());
app.use(methodOverride("_method"));
// seedDB(); 

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "This is my course!",
  resave: false,
  saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
})

app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundsRoutes);


app.listen(6060, function(){
    console.log("It's working!!!")
});