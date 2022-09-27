const express = require('express');

require('dotenv').config();
const bp = require('body-parser');
const passport = require('./src/config/auth');
const cors = require('cors');
const userDetails = require('./src/config/userdb');
const auth = require('./src/routes/auth');
const fat = require('./src/routes/calcfat');
const diet = require('./src/routes/calcdiet');

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
app.use(cors({
  origin:'http://localhost:4200',
  credentials: true
}));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((id, done) => {
  done(
    null,
    (id) => userDetails.findOne({id: id})
  );
});

app.use(passport.initialize());
app.use(passport.session());
app.use('/fat', fat);
app.use('/diet', diet);


app.get('/', auth.checkAuthenticated, (req, res) => {
  res.json({content:'Vista de bienvenida'});    //Aquí puede ir la vista de dashboard
});

app.route('/login')
  .get(auth.checkUnauthenticated, (req, res) => {
    res.json({success:false, statusCode:403});
  })
  .post(passport.authenticate('local', { 
    failureRedirect: '/login',
    failureMessage: true
  }),
    (req, res) => {
      res.json({success: true});
  });

app.post('/register', auth.checkUnauthenticated, async (req, res) => {
  var n = await userDetails.count();
  var result = await auth.newuser(req, n);
  res.json({result:result});
});

app.delete("/logout", (req,res) => {
  req.logOut(
    (err) => {
      if (err) { return next(err); }
    });
  console.log(`-------> User Logged out`);
  res.json({success: true});
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});