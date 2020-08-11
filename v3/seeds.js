var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Jale Beach South",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/02/d1/82/c5/jal-camping.jpg",
        description: "Along the Albanian Riviera in the south, the coast is mostly rocky with either long or secluded shingle and sandy beaches, with the presence of several islands like Sazan, Zvernec, Ksamil, and Tongo. The total coastline of Albania is about 476 km long."
    },
    {
        name: "Borsh , south",
        image: "https://d34ad2g4hirisc.cloudfront.net/location_photos/files/000/129/847/main/b09d89f13aafb899527b7439ccdd001b.jpg",
        description: "Along the Albanian Riviera in the south, the coast is mostly rocky with either long or secluded shingle and sandy beaches, with the presence of several islands like Sazan, Zvernec, Ksamil, and Tongo. The total coastline of Albania is about 476 km long."
    },
    {
        name: "Durres sunset",
        image: "https://images.squarespace-cdn.com/content/v1/5940f2725016e1c79e469470/1560502865815-26SISIZUNJSWRNZ182XF/ke17ZwdGBToddI8pDm48kD_oGUSWuRp2jXjuKEQV3nl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0hReLB75oIvKxcDxwlnLXaaGu5C6er8w8BNVEuqqdDHgJcM47wyS8Wc3GmL3INRFrw/The+Albanian+rivera+is+the+best+spot+for+wild+camping+albania%2C+free+camping+spot+in+Durres",
        description: "Along the Albanian Riviera in the south, the coast is mostly rocky with either long or secluded shingle and sandy beaches, with the presence of several islands like Sazan, Zvernec, Ksamil, and Tongo. The total coastline of Albania is about 476 km long."
    }
]

function seedDB(){
    // remove all campgrounds
    Campground.remove({}, function (err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds !");
         // add few campgrounds
     data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err)
            } else {
                console.log("added a campground");
                // create a comment
                Comment.create(
                    {
                        text: "coment coment coment coment coment coment coment coment coment coment",
                        author: "Author"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("created a new commnet");
                        }
                        
                    }
                )
            }
        });
      });
    });
    
   
    
    // add few comments 
}
module.exports = seedDB;