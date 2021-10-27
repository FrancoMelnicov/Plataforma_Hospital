'use strict'

const { Router, application } = require('express');
const { getUsers, createUser } = require('../controllers/users')
const router = Router();

//GET
router.get('/', getUsers);

//POST
router.post('/', createUser);

module.exports = router;