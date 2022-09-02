const express = require('express');

require('dotenv').config(); //Setting the env file
const bp = require('body-parser');  //required for getting the req.body content
/*  Passport packages required  */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
/*  Mongoose and passport-local-mongoose required for a easier database query job  */
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
/*  Bcrypt required for hashing users passwords  */
const bcrypt = require('bcrypt');
const saltOrRounds = 12;  //salting the passwords

const session = require('express-session'); //Necesary for users on authentication-required routes

const app = express();  //Setting up the app
const port = process.env.PORT;  //Port defined in .env file

mongoose.connect(process.env.DBURI);  //Mongodb database uri

/*  Creating a new Mongoose schema for our user authentication  */
const Schema = mongoose.Schema;
const user = new Schema({
  id: Number,
  email: String,
  password: String,
  details: {
    name: String,
    lastname: String,
    birthdate: Date,
    gender: String
  },
  history: {
    date: Date,
    height: String,
    weight: String,
    pfat: Number
  },
  profile: {
    theme: String,
    lang: String
  }
});

/*  
  Creating the model for the MongoDB.
  - 'UserInfo' is the name of the model  
  - 'user' is the base Mongoose Schema
  - 'personas' is the MongoDB collection
*/
const userDetails = mongoose.model('UserInfo',user,'personas');
/*
  Mongoose creates a unique 'username' index on our collection by default.
  clearIndexes() function removes all indexes and only _id stays.
*/
user.clearIndexes();


app.use(session({   //Setting the session usage in ExpressJS app
  secret: 'keyboard cat',   //This should be a secret code
  resave: false,
  saveUninitialized: false
}));

user.plugin(passportLocalMongoose); //Inserting some methods in user Schema for getting passport-local-mongoose to work

/*
  Setting body-parser in ExpressJS app
*/
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

/*
  Here we configure the Strategy, including the verify callback: async (username,password,done)
*/
passport.use(new LocalStrategy(
  { 
    usernameField: 'username',  //Here goes the name property of the input on the login form
    passwordField: 'password'   //Here goes the  property of the input on the login form
  },
  async (username,password,done) => {   //this is the 'verify' function

/*
    Inside findOne function, we write findOne({query}, callback).
    Here, query is email: username, where 'email' is based on the Schema user properties
    and 'username' is the parameter passed to the verify function
*/
    userDetails.findOne({email: username}, async (err, usuario) => { 
      if (err) { 
        console.log("error");
        return done(err);
      }
      if (!usuario) { 
        console.log("Not found");
        return done(null, false);
      }
      var hash = usuario.password;  //hashed password from database
      var boolPass = await bcrypt.compare(password, hash);
      if (!boolPass) {
        console.log("Wrong password");
        return done(null, false); 
      }
      console.log("Success");
      return done(null, usuario);
    });
  }
));

/*
  Here, we use the serialize() and deserialize() function to set the sessions up
  A cookie named connect.sid will be passed to the user, and that cookie must be present in the header
  when perfoming requests to protected routes 
*/
passport.serializeUser((user, done) => {
  done(null, user.id);  //It's recomended not to pass the entire user's information
});
passport.deserializeUser((id, done) => {
  done(
    null,
    (id) => userDetails.findOne({id: id}) //We use the information passed on the serialize() function
  );
});

app.use(passport.initialize());   //Initializing passport auth functions
app.use(passport.session());      //Initializing passport session functions

/*
  The checkAuthenticated constant is a function for checking if an user is authenticated.
  We use this function as a callback for protecting the routes that require authentication.
*/
const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next() }
  res.redirect("/login")
}

/*
  The checkUnauthenticated constant is a function for checking if an user is authenticated.
  We use this function as a callback for protecting the routes where authenticated user should not have access.
*/
const checkUnauthenticated = (req, res, next) => {
  if (req.isUnauthenticated()) { return next() }
  res.status(603).redirect('/');
}

/*
  The newuser constant is a function for registering new users
*/
const newuser = async (req, n) => {
  var hash = await bcrypt.hash(req.body.password,saltOrRounds);   //Hashing the password
  var userinsert = {    //We create an object with the user information
    'id': n+1,
    'email': req.body.username,
    'password': hash,
    'details': {
      'name': req.body.name,
      'lastname': req.body.lastname,
      'birthdate': new Date(req.body.birthdate),
      'gender': req.body.gender
    },
    'history': {
      'date': null,
      'height': "",
      'weight': "",
      'pfat': null
    },
    'profile': {
      'theme': 'light',
      'lang': 'es'
    }
  }
  //First we check that there are no empty fields
  //We should perform this step first at the top of the function, but I forgot ¯\_(ツ)_/¯
  if (req.body.username != "" && req.body.password != "" && req.body.name != "" && req.body.lastname != "" && req.body.birthdate != "" && req.body.gender != "") {
    var validateEmail = await userDetails.findOne({email:req.body.username});   //We try to find a user by the email address
    if (validateEmail != null) {  //If a user with that email address already exists
      return "userExists";
    }else {
      try {
        var dbRes = await userDetails.create(userinsert);   //We try to create the new user in the database
        return dbRes;
      } catch (error) {
        return error;
      }
    }
  }else {
    return "emptyFields";
  }
}

/*
  This route is protected. Only authenticated user can access to it.
*/
app.get('/', checkAuthenticated, (req, res) => {
  res.send('Vista de bienvenida');
});

app.get('/login', function(req, res) {
  res.send('Vista de Login');
});

app.post('/login', passport.authenticate('local', { 
  successRedirect: '/',       //If authentication attemps is successful
  failureRedirect: '/login',  //If authentication attemps fails
  failureMessage: true
}),
  /*
    This is what happens if authentication is successful.
    You can delete these lines and use the app.get('/', checkAuthenticated, (req, res) instead,
    because we already have successRedirect.
  */
  (req, res) => {
    res.redirect('/');
});

/*
  This route is protected. Only unauthenticated user can access to it.
*/
app.post('/register', checkUnauthenticated, async (req, res) => {
  var n = await userDetails.count();
  var result = await newuser(req, n);
  console.log(result);
  res.send('Vista de registro');
});


/*
  Route for logging out. The callback on logOut function is required.
*/
app.delete("/logout", (req,res) => {
  req.logOut(
    (err) => {
      if (err) { return next(err); }
    });
  console.log(`-------> User Logged out`);
  res.redirect("/login");
});


/*
  Setting up the server
*/
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});