let express = require("express");
let bodyParser = require("body-parser");
let ejs = require("ejs");
let _ = require('lodash');

let homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
let aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
let contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let app = express();
let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Home Page
app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
  }); //render() method is used because we are using EJS templating engine
});

//Blog Page
app.get("/blog", function(req, res){
  res.render("blog", {
    posts : posts,
  });
});

//About Page
app.get("/about", function(req, res){
  res.render("about", {
    about: aboutContent,
  });
});

//Contact Page
app.get("/contact", function(req, res){
  res.render("contact", {
    contact: contactContent,
  });
});

//Write a Post Page
app.get("/compose", function(req, res){
  res.render("compose")
});

//getting post content
app.post("/compose", function(req, res){
  let post = {
    title : req.body.postTitle,
    date : req.body.publishingDate,
    content : req.body.postContent,
  }
  posts.push(post);
  res.redirect("/blog");
});

//custom post page
app.get('/blog/:post', function(req, res){
  let requestedTitle = _.lowerCase(req.params.post);
  posts.forEach(function (post) {
    let storedTitle = _.lowerCase(post.title);
    let storedDate = post.date;
    let storedContent = post.content;
    if(storedTitle === requestedTitle){
      res.render("post", {
        title : storedTitle,
        date : storedDate,
        content : storedContent,
      })
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});