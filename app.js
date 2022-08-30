const express = require('express');

require('dotenv').config();
const bp = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcrypt');
const saltOrRounds = 12;

const session = require('express-session');

const app = express();
const port = process.env.PORT;

mongoose.connect(process.env.DBURI);

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

const userDetails = mongoose.model('UserInfo',user,'personas');
user.clearIndexes();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

user.plugin(passportLocalMongoose);

app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

passport.use(new LocalStrategy(
  { 
    usernameField: 'username',
    passwordField: 'password'
  },
  async (username,password,done) => {
    userDetails.findOne({email: username}, async (err, usuario) => {
      if (err) { 
        console.log("error");
        return done(err); 
      }
      if (!usuario) { 
        console.log("Not found");
        return done(null, false);
      }
      var hash = usuario.password;
      var boolPass = await bcrypt.compare(password, hash);
      if (!boolPass) {
        console.log("Contraseña incorrecta");
        return done(null, false); 
      }
      console.log("Éxito");
      return done(null, usuario);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  done(
    null,
    (id) => userDetails.findOne({id: id})
  );
});

app.use(passport.initialize());
app.use(passport.session());

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next() }
  res.redirect("/login")
}

const checkUnauthenticated = (req, res, next) => {
  if (req.isUnauthenticated()) { return next() }
  res.status(603).redirect('/');
}

const newuser = async (req, n) => {
  var hash = await bcrypt.hash(req.body.password,saltOrRounds);
  var userinsert = {
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
  if (req.body.username != "" && req.body.password != "" && req.body.name != "" && req.body.lastname != "" && req.body.birthdate != "" && req.body.gender != "") {
    var validateEmail = await userDetails.findOne({email:req.body.username});
    if (validateEmail != null) {
      return "userExists";
    }else {
      try {
        var dbRes = await userDetails.create(userinsert);
        if (n == 0) {
          
        }
        return dbRes;
      } catch (error) {
        return error;
      }
    }
  }else {
    return "emptyFields";
  }
}

app.get('/', checkAuthenticated, (req, res) => {
  res.send('Vista de bienvenida');
});

app.get('/login', function(req, res) {
  res.send('Vista de Login');
});

app.post('/login', passport.authenticate('local', { 
  successRedirect: '/',
  failureRedirect: '/login',
  failureMessage: true
}),
  (req, res) => {
    res.redirect('/');
});

app.post('/register', checkUnauthenticated, async (req, res) => {
  var n = await userDetails.count();
  var result = await newuser(req, n);
  console.log(result);
  res.send('Vista de registro');
});

app.delete("/logout", (req,res) => {
  req.logOut(
    (err) => {
      if (err) { return next(err); }
    });
  console.log(`-------> User Logged out`);
  res.redirect("/login");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});