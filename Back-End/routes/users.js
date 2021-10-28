'use strict'

const { Router, application } = require('express');
const { getUsers, createUser } = require('../controllers/users');
//para hacer validaciones de las request
const { check } = require('express-validator')
const router = Router();

//GET
router.get('/', getUsers);

//POST
router.post(
    '/', 
    [
        //validamos que estos campos cumplan con los parametros establecidos y en caso de no este envía un error a la request
        check('name', 'Name is empty').not().isEmpty(),
        check('password', 'Password is empty').not().isEmpty(),
        check('email', 'Nota validate email').isEmail()
    ]
    , createUser
);

module.exports = router;