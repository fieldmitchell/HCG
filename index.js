const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
//const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();

//connects express routers for the root endpoints
const api = require('./api')

//middleware
app.use(cors());
app.use(bodyParser.json());

const uri = process.env.ATLAS_URI;

//connecting to local host 
mongoose.connect(uri, { useNewUrlParser: true })

//connects to mongodb
mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
mongoose.connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})
process.on('SIGINT', () => {
    mongoose.disconnect(err => {
      process.exit(err ? 1 : 0)
    })
})

//using our express routes
app.use('/api', api)

//connects to port
app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});