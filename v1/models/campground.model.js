const mongoose = require('mongoose'); 

CampgroundSchema = mongoose.Schema({
    name: String,
    image: String
}, {
    timestamps: true
});

module.exports  = mongoose.model('Campground', CampgroundSchema);