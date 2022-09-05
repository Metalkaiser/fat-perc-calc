var express = require('express');
const auth = require('./auth');
const userDetails = require('../config/userdb');
let storeHistory = require('../../assets/js/fatperc');
var router = express.Router();


router.get('/', auth.checkAuthenticated, async (req,res) => {
  let details = await userDetails.findOne({id: req.session.passport.user},{'details.gender':1});
  res.send(details.details.gender);
});
router.post('/', auth.checkAuthenticated, async (req, res) => {
  var result = await storeHistory(req.session.passport.user, req.body);
  res.send(result);
});

router.get('/history', auth.checkAuthenticated, async (req, res) => {
  let details = await userDetails.findOne({id: req.session.passport.user},{details:1, history:1});
  console.log(details);
  res.send('Fatcalc history');
});

module.exports = router;