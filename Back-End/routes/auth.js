const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateAttribute } = require('../middlewares/validate-request');
const router = Router();

router.post(
    '/login',
    login
    )

module.exports = router;