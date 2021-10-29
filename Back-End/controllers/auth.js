const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const login = async(req, res) => {

    try{

        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({
                ok: false,
                message: 'Not found'
            })
        }

        //verificar passwrord


    } catch(err){
        console.log(err);
        res.status(500).json({
            ok: false,
            message: "Error to login"
        })
    }
}

module.exports = {
    login
}