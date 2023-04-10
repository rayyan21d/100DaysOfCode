// Requiring mongoose and connecting to the database
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/fruitsDB")
    .then(() => {
        console.log("Connected to MongoDB!");
    })
    .catch((err) => {
        console.error(err);
});


//Creating a document in the collection
const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    age: Number
});

//Creating a model
const Person = mongoose.model("person", personSchema);

//Creating a document
 const john = new Person({
    id: 1,
    name: "John",
    age: 21
});

//Saving the document to the collection
john.save().then(() => {
    console.log("Document has been saved:", john);
}).catch((error) => {
    console.error("Error while saving document:", error);
});



//Inserting many documents to the collection
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please check your data entry, no name specified!"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10  
    },
    review: String
});


/*---------------------------------------------------------*/



const Fruit = mongoose.model("Fruit", fruitSchema);

const apple = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Pretty solid as a fruit."
});

const kiwi = new Fruit({
    name: "Kiwi",
    rating: 10,
    review: "The best fruit!"
});

const mango = new Fruit({
    name: "Mango",
    rating: 8,
    review: "Decent fruit."
});

const orange = new Fruit({
    name: "Orange",
    rating: 5,
    review: "Vitamin C is good."
});

const banana = new Fruit({
    name: "Banana",
    rating: 4,
    review: "Good for potassium."
});

Fruit.insertMany([apple, kiwi, mango, orange, banana]);



//This will cause an error as name is required when saved!
const fruit = new Fruit(
    {
        rating: 10,
        review: "Peaches are so yummy!"
    }
);

fruit.save().then(() => {
    console.log("Fruit has been saved:", fruit);
}).catch((error) => {
    console.error("Error while saving fruit!! :", error);
});


Fruit.find().then ((fruits)=>{

    fruits.forEach((fruit)=>{
        console.log(fruit.name);
    });    

    //Close the connection
    mongoose.connection.close();

}).catch((err) => {
    console.error(err);
});



