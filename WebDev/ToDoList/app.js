const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function(){
    console.log("Server started on port 3000")
});

var items = [];

app.get("/", function(req, res){

    var today = new Date();
    var options = { 
        weekday: 'long',
        year: 'numeric',
        month: 'long' 
    };

    //toDateString() is used to formate the date using the options object and locale string
    var day = today.toLocaleDateString("en-US", options);

    res.render("list", {kindOfDay: day, newListItemz: items});

});


app.post("/", function(req, res){

    console.log("Post request received");
    var item = req.body.newItem;
    items.push(item);
    res.redirect("/");
    
});