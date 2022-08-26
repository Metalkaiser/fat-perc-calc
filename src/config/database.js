const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

url = process.env.DBURL;
client = new MongoClient(url);
dbName = process.env.DBNAME;

async function main() {
  await client.connect();
  console.log('Connected successfully to database');
  const db = client.db(dbName);

  return db;
}

function closeServer(){
  client.close();
  console.log('Connection to database closed')
}

module.exports = { closeServer, main}