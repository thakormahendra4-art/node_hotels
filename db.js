const mongoose  = require('mongoose');

// define the mongoDb connecting url
const mongoDbUrl = 'mongodb://localhost:27017/hotels'; // replace 'hotel' with your MongoDB database name

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
