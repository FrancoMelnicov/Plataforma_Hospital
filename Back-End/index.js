'use strict'

//libraryes and frameworks
const express = require('express');
const env = require('./host/config');
const cors = require('cors');
const { dbConnection } = require('./database/config')

//databases connections
dbConnection();

//express
const app = express();

//cors
app.use(cors());

//parsear body de requests
app.use(express.json());

const port = env.PORT;

//routes
const api_route = "/api-hospital";
const user_route = "/users";
const hospital_route = "/hospitals";
app.use(api_route + user_route, require('./routes/users'));
app.use(api_route + user_route, require('./routes/auth'));
app.use(api_route + hospital_route, require('./routes/hospital'))

app.get(
    "/",
    (req, res) =>{
        res.send("Welcolme to Api_Hostipal")
    }
)

app.listen( port, () => {
    console.log("Server running on port: " + port);
})
