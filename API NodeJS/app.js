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
  saveUninitialized: false,
  cookie: { sameSite: 'strict' }
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


app.get('/', auth.checkAuthenticated, async (req, res) => {
  let user = await userDetails.findOne({id:req.session.passport.user},{details:1,history:1,profile:1});
  res.json({user:user});
});

app.route('/login')
  .get(auth.checkUnauthenticated, (req, res) => {
    res.json({success:false, statusCode:403});
  })
  .post(passport.authenticate('local', { 
    failureRedirect: '/login',
    failureMessage: true
  }),
    async (req, res) => {
      let user = await userDetails.findOne({id:req.session.passport.user},{details:1,profile:1});
      res.json({success: true, user: user});
  });

app.post('/register', auth.checkUnauthenticated, async (req, res) => {
  var n = await userDetails.count();
  var result = await auth.newuser(req, n);
  res.json({result:result});
});

app.patch('/changepass', auth.checkAuthenticated, async (req, res) => {
  let user = await userDetails.findOne({id:req.session.passport.user},{password:1});
  result = await auth.bcrypt.compare(req.body.oldpass,user.password);
  console.log('resultado: ' + result);
  if (result) {
    let hash = await auth.bcrypt.hash(req.body.newpass,auth.saltOrRounds);
    await userDetails.updateOne({id:req.session.passport.user},{$set:{password:hash}})
    res.json({resultado:result});
  } else {
    res.json({resultado:result});
  }
});

app.patch('/changeprofile', auth.checkAuthenticated, async (req, res) => {
  await userDetails.updateOne({id:req.session.passport.user},{$set:{
    'profile.lang':req.body.lang,
    'profile.theme':req.body.theme
  }});
  res.json({lang:req.body.lang,theme:req.body.theme});
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