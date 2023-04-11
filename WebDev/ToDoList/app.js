const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
//Requiring mongoose
const mongoose = require('mongoose');

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

//Connecting to local database
mongoose.connect("mongodb://127.0.0.1/todolistDB");

const itemSchema = {
    name:{
        type: String,
        required: true
    }

}


const Item = mongoose.model("Item", itemSchema);


const item1 = new Item({
    name: "Welcome to your todolist!"
});

const item2 = new Item({
    name: "Hit the + button to add a new item."
});

const item3 = new Item({
    name: "<-- Hit this to delete an item."
});
const defaultItems = [item1, item2, item3];


//New schema for custom lists
const listSchema = {
    name: String,
    items: [itemSchema]
};
//Creating a new model for the custom lists
const List = mongoose.model("List", listSchema);





//Requiring a local module
const day = require(__dirname + "/date.js");

app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function(){
    console.log("Server started on port 3000")
});

//Todo list items log




app.get("/", function(req, res){

    Item.find({}).then((foundItems) => {

        let date = day.getDate();

        if (foundItems.length === 0) {
            Item.insertMany(defaultItems).then(() => {
                console.log("Successfully inserted default items using mongoDB");
            }).catch((err) => {
                console.log(err);
            })

            res.redirect("/");
        }

        else{
            res.render("list", { ListTitle: date, newListItemz: foundItems });
        }

       

    }).catch((err) => {
        console.log(err);
    });

    
});


app.post("/", function(req, res){

    const itemName = req.body.newItem;
    const item = new Item({
        name: itemName
    });

    item.save().then(() =>{
        console.log("Successfully added new item");
    })
    res.redirect("/");
});


app.post("/delete", function(req, res){

    const checkedItemId = req.body.checkbox;
    Item.findByIdAndRemove(checkedItemId).then(() => {
        console.log("Successfully deleted checked item");
        res.redirect("/");

    }).catch((err) => {
        console.log(err);
    });
});



app.get("/:customListName", function(req, res){

    const customListName = req.params.customListName;

    const list = new List({
        name: customListName,
        items: defaultItems
    });

    list.save().then(() => {
        console.log("Successfully added new list");


    }).catch((err) => {
        console.log(err);
    });
});




app.get("/work", function(req, res){
    
    res.render("list", {ListTitle: "Work List", newListItemz: workItems});

});



app.get("/about", function(req, res){
    res.render("about");
})