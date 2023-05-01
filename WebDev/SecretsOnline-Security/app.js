//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

//Creating a URI for database using an IP address and setting up mongoose
const URI = "mongodb://127.0.0.1:27017/userDB";
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});


app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


//Creating a user schema for the database


const isEmail = (email) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
};

const isPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
};

const isEmails = (email) => {
    // use a regular expression to validate the email format
    return /^\S+@\S+\.\S+$/.test(email);
};
const userSchema = {

    email: { type: String, 
        required: [true, "Email field is required"], 
        unique:true, 
        validate: {validator: isEmail, message: 'Invalid email.'}
    },
    password: { type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    }
    
}

const User = mongoose.model("User", userSchema);


//When user registers
app.post("/register", function(req, res) {
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });
    newUser.save().then(() => {
        res.render("secrets");
    }).catch((err) => {
        console.log(err);
    });
});


app.post("/login", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email: username}).then((foundUser) => {
        if (foundUser) {
            if (foundUser.password === password) {
                res.render("secrets");
            } else {
                res.send("Invalid password");
            }
        } else {
            res.send("User not found");
        }
    });

});

app.get("/logout", function(req, res) {
    res.redirect("/");
});

app.get("/submit", function(req, res) {
    res.render("submit");
});


app.get("/", function(req, res) {
    res.render("home");
});

app.get("/login", function(req, res) {  
    res.render("login");
});

app.get("/register", function(req, res) {
    res.render("register");
});

app.get("/secrets", function(req, res) {
    res.render("secrets");
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
    }
);
