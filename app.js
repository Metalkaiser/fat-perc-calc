const express = require('express');
const bp = require('body-parser');
const crypto = require('crypto');
const { promisify } = require('util');

var users = require('./src/routers/users');                   //router for user characteristics
var { closeServer, main } = require('./src/config/database'); //database functions
var user = require('./app/models/user');                       //class model for new users
const { count } = require('console');

const app = express();

//Using body-parser for req.body
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

//Declaring the port for the server
const port = process.env.PORT;

/*
  Route for registering new users
*/
app.post('/register', function (req, res) {
  var formdata = req.body;

  //Connecting to the database
  main()
    .then(response => resultado(response))
    .catch(console.error);

  //handling the connection to the database
  async function resultado(response) {
    const collection = response.collection('personas');   //mongodb collection
    var findResult = await collection.countDocuments();
    var id = ++findResult;
    var salt = crypto.randomBytes(16).toString("hex");    //generating the salt
    
    crypto.scrypt(formdata.password,salt,64,(err,derivedKey) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      var password = salt + ":" + derivedKey.toString('hex');   //generating the hashed password
      var newuser = new user(id,formdata.email,password,formdata.name,formdata.lastname,formdata.birthdate,formdata.gender);
      try {
        dbInsert(collection, newuser);
      } catch (error) {
        res.send(error);
      }
    });
  }

  //handling the insert on the collection
  async function dbInsert(collection, newuser) {
    const insertResult = await collection.insertOne(newuser);
    res.send(insertResult);
    closeServer();
  }
});

/*
  Route for logging in the app
*/
app.post('/login', function (req, res) {
  var formdata = req.body;
  const scrypt = promisify(crypto.scrypt);
  //Connecting to the database
  main()
    .then(response => resultado(response))
    .catch(console.error);

  //handling the connection to the database
  async function resultado(response) {
    const collection = response.collection('personas');
    var findResult = await collection.findOne({email : formdata.email});
    closeServer();
    
    if (findResult == null) {
      res.send("No encontrado");
    } else {
      verify(formdata.password, findResult.password);
    }
  }

  //Checking if password is correct
  async function verify(password, hash) {
    const [salt, key] = hash.split(":");        //Extract the salt
    const keyBuffer = Buffer.from(key, 'hex');
    const derivedKey = await scrypt(password, salt, 64);
    var boolPass = crypto.timingSafeEqual(keyBuffer, derivedKey);   //Comparing the password
    
    if(boolPass) {
      res.send("Bienvenido!");
    }else {
      res.send("Credenciales inválidas");
    }
  }
});

app.use('/users', users);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});