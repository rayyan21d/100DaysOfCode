const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function(){
    console.log("Server started on port 3000")
});

//Todo list items log
var items = [ 'Workout', 'Fajr', 'Breakfast' ];
var workItems = [];


app.get("/", function(req, res){

    var today = new Date();
    var options = { 
        weekday: 'long',
        year: 'numeric',
        month: 'long' 
    };

    //toDateString() is used to formate the date using the options object and locale string
    var day = today.toLocaleDateString("en-US", options);

    res.render("list", {ListTitle: day, newListItemz: items});

});


app.post("/", function(req, res){

    let item = req.body.newItem;
    console.log(req.body.button);

    //The list name is passed in the form of a hidden input which detects from where the post request is coming from
    if(req.body.button == "Work") {
        
        workItems.push(item);
        res.redirect("/work");
    }
    else {
        items.push(item);
        res.redirect("/");
    }
});


app.get("/work", function(req, res){
    
    res.render("list", {ListTitle: "Work List", newListItemz: workItems});

});



app.get("/about", function(req, res){
    res.render("about");
})