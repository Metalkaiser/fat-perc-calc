const userDetails = require('../config/userdb');
const bcrypt = require('bcrypt');
const saltOrRounds = 12;

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next() }
  res.json({success:false, statusCode:403});
}

const checkUnauthenticated = (req, res, next) => {
  if (req.isUnauthenticated()) { return next() }
  res.status(603).redirect('/');
}

const newuser = async (req, n) => {
  var hash = await bcrypt.hash(req.body.password,saltOrRounds);
  var userinsert = {
    'id': n+1,
    'username': req.body.username,
    'password': hash,
    'details': {
      'name': req.body.name,
      'lastname': req.body.lastname,
      'birthdate': new Date(req.body.birthdate),
      'gender': req.body.gender
    },
    'history': {},
    'profile': {
      'theme': 'light',
      'lang': 'es'
    }
  }
  if (req.body.username != "" && req.body.password != "" && req.body.name != "" && req.body.lastname != "" && req.body.birthdate != "" && req.body.gender != "") {
    var validateEmail = await userDetails.findOne({username:req.body.username});
    if (validateEmail != null) {
      return "userexists";
    }else {
      try {
        var dbRes = await userDetails.create(userinsert);
        if (n == 0) {
          
        }
        return 'success';
      } catch (error) {
        return error;
      }
    }
  }else {
    return "emptyfields";
  }
}

module.exports = { checkAuthenticated, checkUnauthenticated, bcrypt, saltOrRounds, newuser };