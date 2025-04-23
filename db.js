
const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'produitsDB';

let db;

async function connectDB() {
  const client = new MongoClient(url);
  await client.connect();
  db = client.db(dbName);
  console.log("✅ MongoDB connecté");
}

function getDB() {
  return db;
}

module.exports = { connectDB, getDB };
