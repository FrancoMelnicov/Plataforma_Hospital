'use strict'

const { validationResult } = require('express-validator');
const { response } = require('express');

const validateAttribute = (req, res = response, next) => {

    //revisar erroes en la request
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            //enviamos la lista de errores en la responsive
            errors: errors.mapped()
        })
    }

    next();
}

module.exports = {
    validateAttribute
}