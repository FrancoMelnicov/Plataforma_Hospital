'use strict'

const { Router } = require('express');
const { getHospital, getHospitals, createHospital, updateHospital, deleteHospital} = require('../controllers/hospital');
const { check } = require('express-validator');
const { validateAttribute } = require('../middlewares/validate-request');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

//GET
router.get('/get-list-hospitals', validateJWT, getHospitals);
router.get('/get-hospital/:hospital_id', validateJWT, getHospital);

//POST
router.post(
    '/new-hospital',
    [
        validateJWT,
        check('name', 'Name is empty').not().isEmpty(),
        validateAttribute
    ],
    createHospital
);

//PUT
router.put(
    '/edit-hospital/:hospital:id',
    [
        validateJWT,
        check('name', 'Name is required').not().isEmpty(),
        validateAttribute
    ],
    updateHospital
)

//DELETE
router.delete(
    '/delete-hospital/:hospital_id',
    [
        validateJWT
    ],
    deleteHospital
)

module.exports = router;
