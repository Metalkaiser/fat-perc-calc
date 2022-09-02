const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userDetails = require('../database/userdb');
const bcrypt = require('bcrypt');

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

module.exports = passport;