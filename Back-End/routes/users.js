'use strict'

const { Router } = require('express');
const { getUsers, createUser, getUser, updateUser, deleteUser } = require('../controllers/users');
//para hacer validaciones de las request
const { check } = require('express-validator');
const router = Router();
const { validateAttribute } = require('../middlewares/validate-request');
const { validateJWT } = require('../middlewares/validate-jwt')

//GET
router.get('/get-list-users', validateJWT, getUsers);
router.get('/get-user/:user_id', validateJWT, getUser);

//POST
router.post(
    '/new-user', 
    [
        validateJWT,
        //validamos que estos campos cumplan con los parametros establecidos y en caso de no este envía un error a la request
        check('name', 'Name is empty').not().isEmpty(),
        check('password', 'Password is empty').not().isEmpty(),
        check('email', 'Nota validate email').isEmail(),
        validateAttribute
    ]
    , createUser
);

//UPDATE
router.put(
    '/edit-user/:user_id',
    [
        validateJWT,
        //validamos que estos campos cumplan con los parametros establecidos y en caso de no este envía un error a la request
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').not().isEmpty(),
        check('role', 'Role is required').not().isEmpty(),
        validateAttribute
    ],
    updateUser
)

//DELETE
router.delete(
    '/delete-user/:user_id',
    //[validateAttribute],
    validateJWT,
    deleteUser
)

module.exports = router;