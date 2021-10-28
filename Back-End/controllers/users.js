'use strict'

const { validationResult } = require('express-validator')
const { json } = require('express')
const User = require('../models/user')

const getUsers = async (req, res) => {

    const users = await User.find({}, 'name email role google');

    res.json({
        ok: true,
        users
    })
}

const createUser = async (req, res) => {

    const { email, password, name } = req.body;
    //se cargan todos los errores que no cumplan con los parametros de la informacion
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            //enviamos la lista de errores en la responsive
            errors: errors.mapped()
        })
    }

    try {

        const duplicatEmail = await User.findOne({ email });
        if(duplicatEmail){
            //realizar un retur porque si no continua con el resto de la funcion
            return res.status(400).json({
                ok: false,
                message: 'This email has been used'
            })
        }

        const user = new User(req.body);
        await user.save();
        res.json({
            ok: true,
            user
        })

    } catch(err) {

        console.log(err);
        res.status(500).json({
            ok: false,
            message: "Error to save user"
        })
    }
}

module.exports = {
    getUsers,
    createUser
}