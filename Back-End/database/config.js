'use strict'

const mongoose = require('mongoose');
require('dotenv').config();

const user = process.env.USER;
const password = process.env.PASSWORD;
const db_connection = process.env.DB_CONNECTION;

const dbConnection = async () => {

    try {

        mongoose.connect(db_connection, {
            //parametros requeridos para realizar la conexion
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Connection to database successfully")

    } catch(err){
        console.log(err);
        throw new Error('Error to conect with database')
    }
}

//ODMx2SnjEVmCiLdk

module.exports = {
    dbConnection
}