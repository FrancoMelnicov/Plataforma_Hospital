const { response } = require('express');
const { generateJWT } = require('../helpers/jwt')
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const login = async(req, res) => {

    try{

        const user = await User.findOne({ email: req.body.email });
        if(!user){
            return res.status(404).json({
                ok: false,
                message: 'Not found'
            })
        }

        //verificar passwrord
        const validPassword = bcrypt.compareSync(req.body.password, user.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                message: "Password not valid"
            });
        };

        //generar jwt
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            token
        })

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