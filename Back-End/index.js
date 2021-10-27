'use strict'

//libraryes and frameworks
const express = require('express');
const env = require('./host/config');
const cors = require('cors');
const { dbConnection } = require('./database/config')

//databases connections
dbConnection();

const app = express();
const port = env.PORT;

//cors
app.use(cors());

//routes
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome"
    });
});

app.listen( port, () => {
    console.log("Server running on port: " + port);
})
