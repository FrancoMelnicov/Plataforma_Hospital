const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateAttribute } = require('../middlewares/validate-request');
const router = Router();

router.post(
    '/login',
    [
        check('email', 'Email is required').not().isEmpty().isEmail(),
        check('password', 'Email is required').not().isEmpty(),
        validateAttribute
    ],
    login
    )

module.exports = router;