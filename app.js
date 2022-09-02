const express = require('express');

require('dotenv').config();
const bp = require('body-parser');
const passport = require('./app/config/auth');
const userDetails = require('./app/database/userdb');
const auth = require('./app/routes/auth');

const session = require('express-session');

const app = express();
const port = process.env.PORT;


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

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


app.get('/', auth.checkAuthenticated, (req, res) => {
  res.send('Vista de bienvenida');
});

app.route('/login')
  .get(auth.checkUnauthenticated, (req, res) => {
    res.send('Vista de Login');
  })
  .post(passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true
  }),
    (req, res) => {
      res.redirect('/');
  });

app.post('/register', auth.checkUnauthenticated, async (req, res) => {
  var n = await userDetails.count();
  var result = await auth.newuser(req, n);
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