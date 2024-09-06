const mongoose = require('mongoose');

const MONGO_DB_URL = process.env.MONGO_DB_URL;
const DB_NAME = process.env.DB_NAME;


export default function MongoDB(){
    console.log("MongoDB")
    mongoose.connect(MONGO_DB_URL, { dbName: DB_NAME })
    .then(() => {
        console.log('Connected to MongoDB!');
       
    })
    .catch((err:any) => {
        console.error('Error connecting to MongoDB:', err.message);
    });

}
