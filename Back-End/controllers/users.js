'use strict'

const { json } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const getUsers = async (req, res) => {

    const users = await User.find({}, 'name email role google');

    res.json({
        ok: true,
        users
    })
}

const getUser = async (req, res) => {

    try {
        const user = await User.findById(req.params.user_id, 'name email role google')
        if(user){
            return res.status(200).json({
                ok: true,
                user
            })
        } else {
            return res.status(404).json({
                ok: false,
                message: "User not found"
            })
        }

    } catch(err){
        console.log(err);
        return res.status(500).json({
            ok: false,
            message: 'Error'
        })
    }
}

const createUser = async (req, res) => {

    const { email, password } = req.body;
    //se cargan todos los errores que no cumplan con los parametros de la informacion

    try {
        //verificando el el email no se encuentre repetido
        const duplicatEmail = await User.findOne({ email });
        if(duplicatEmail){
            //realizar un return porque si no continua con el resto de la funcion
            return res.status(400).json({
                ok: false,
                message: 'This email has been used'
            })
        }

        const user = new User(req.body);

        //encriptar contraseña
        const varAlt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, varAlt);

        //

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

const updateUser = async (req, res) => {

    //validar token y comprobar si el usuario es correcto
    try {
    
        const user = await User.findById(req.params.user_id, 'name email role google');
        if(user){
            //quitar estos campos para que no editen aquellos valores que no se deben
            const {password, google, email, ...atrributes} = req.body;
            if(user.email !== email){
                const mailDuplicated = await User.findOne({email: email});
                if(mailDuplicated){
                    return res.status(400).json({
                        ok: false,
                        message: 'This email has been used'
                    })
                }
            }

            atrributes.email = email;

            const userUpdated = await User.findByIdAndUpdate(req.params.user_id, atrributes, {new: true});
            return res.status(200).json({
                ok: true,
                userUpdated
            })
        } else {
            return res.status(404).json({
                ok: false,
                message: "User not found"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            message: "Error to edit user"
        })
    }
}

const deleteUser = async (req, res) => {

    try{
        const user = await User.findById(req.params.user_id);
        if(!user){
            res.status(404).json({
                ok: false,
                message: 'User not found'
            })
        }

        await User.findByIdAndDelete(req.params.user_id);
        res.json({
            ok: true,
            message: 'User eliminaded'
        })

    } catch (err){
        console.log(err);
        res.status(500).json({
            ok: false,
            message: 'Error to delete user'
        })
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}