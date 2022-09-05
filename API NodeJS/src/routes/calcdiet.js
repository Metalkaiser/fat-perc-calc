var express = require('express');
const auth = require('./auth');
const userDetails = require('../../src/config/userdb');
let calculateDiet = require('../../assets/js/dietcalc');
var router = express.Router();

router.get('/', auth.checkAuthenticated, async (req,res) => {
  res.send("Calcular dieta");
});
router.post('/', auth.checkAuthenticated, async (req, res) => {
  let user = await userDetails.findOne({id: req.session.passport.user});
  var result = await calculateDiet(user, req.body);
  res.send(result);
});

module.exports = router;