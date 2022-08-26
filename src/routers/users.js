const express = require('express');
var users = express.Router();
var { closeServer, main } = require('../config/database');

users.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

users.get('/profile', function (req, res) {
  main()
    .then(response => resultado(response))
    .catch(console.error)
    .finally(() => {
      closeServer();
    });

  async function resultado(response) {
    const collection = response.collection('personas');
    const findResult = await collection.find({}).toArray();
    res.send(findResult);
  }
});

users.get('/history&id=:id', function (req, res) {
  main()
    .then(response => resultado(response))
    .catch(console.error)
    .finally(() => {
      closeServer()
    });

  async function resultado(response) {
    var qid = parseInt(req.params.id);
    const collection = response.collection('personas');
    const findResult = await collection.find({id:qid}).toArray();
    res.send(findResult);
  }
});


module.exports = users;