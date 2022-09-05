require('dotenv').config();
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


mongoose.connect(process.env.DBURI);

const Schema = mongoose.Schema;
const user = new Schema({
  id: Number,
  username: String,
  password: String,
  details: {
    name: String,
    lastname: String,
    birthdate: Date,
    gender: String
  },
  history: [],
  profile: {
    theme: String,
    lang: String
  }
});

const userDetails = mongoose.model('UserInfo',user,'personas');
user.clearIndexes();

user.plugin(passportLocalMongoose);

module.exports = userDetails;