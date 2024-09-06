const { MongoClient } = require('mongodb');
const mongo_uri = process.env.DB_URL;

const client = new MongoClient(mongo_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectToDatabase = async () => {
  return await client.connect()
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));
}

const db = client.db(process.env.DB_DATABASE);
const trading_price_collection = db.collection('trading_prices');

// await trading_price_collection.createIndex({
//   currency: 1
//   });

module.exports = {connectToDatabase,trading_price_collection};
