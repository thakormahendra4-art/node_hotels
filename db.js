const mongoose  = require('mongoose');
require ('dotenv').config();

// define the mongoDb connecting url
const mongoDbUrl = process.env.MONGODB_URL_LOCAL; // replace 'hotel' with your MongoDB database name
// const mongoDbUrl = process.env.MONGODB_URL;

// connect to the MongoDB database using Mongoose
mongoose.connect(mongoDbUrl)

// Get the default connection
//Mongoosen maintains a default connection object representing  the MongoDB connection
const db = mongoose.connection;

//define event listeners for the database connection
db.on('connected', () => {
    console.log('Connected to MongoDB server successfully');
});

db.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB server');
});

// export the database connection for use in other parts of the application
module.exports = db;
