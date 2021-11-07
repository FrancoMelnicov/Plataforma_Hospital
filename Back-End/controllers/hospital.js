'use strict'

const { json } = require('express');
const { generateJWT } = require('../helpers/jwt');
const bcrypt = require('bcryptjs');
const Hospital = require('../models/hospital');

const getHospitals = async (req, res) => {

    const hospitals = await Hospital.find({}, 'user img');

    return res.json({
        ok: true,
        hospitals,
        uid: req.uid
    })
}

const getHospital = async (req, res) => {

    try {
        const hospital = await Hospital.findById(req.params.hospital_id, 'name img');

        if(hospital){
            return res.status(200).json({
                ok: true,
                hospital
            })
        } else {
            return res.status(404).json({
                ok: false,
                message: "Hospital not found"
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

const createHospital = async (req, res) => {
    
    const { name, img } = req.body;

    try {

        const duplicateName = await Hospital.findOne
        ({ name });
        
        if(duplicateName){

            return res.status(400).json({
                ok: false,
                message: "This name has been used"
            })
        }

        const hospital = new Hospital(req.body);

        await hospital.save();

        const token = await generateJWT(hospital.id);

        res.json({
            ok: true,
            hospital,
            token
        });
    } catch(err){
        
        console.log(err);
        return res.status(500).json({
            ok: false,
            message: "Error to save hospital"
        });
    }
}

const updateHospital = async (req, res) => {

    try {

        const hospital = await Hospital.findById(req.params.hospital_id, 'name img');

        if(hospital){

            const { name, img, ...atrributes } = req.body;
            
            if(hospital.name !== name){

                const nameDuplicated = await Hospital.findOne({ name: name });
                
                if(nameDuplicated){

                    return res.status(400).json({
                        ok: false,
                        message: "This name has been used"
                    });
                };
            }

            atrributes.name = name;

            const hospitalUpdated = await Hospital.findByIdAndUpdate(req.params.hospital_id, atrributes, {new: true});
            return res.status(200).json({
                ok: true,
                hospitalUpdated
            });
        } else {
            
            return res.status(404).json({
                ok: false,
                message: "Hospital not found"
            });
        };
    } catch(err) {

        console.log(err);
        return res.status(500).json({
            ok: false,
            message: "Erro to edit user"
        });
    };
};

const deleteHospital = async (req, res) => {

    try{
        
        const hospital = await Hospital.findById(req.params.hospital_id);

        if(!hospital){

            return res.status(404).json({
                ok: false,
                message: 'Hospital not found'
            });
        }

        await Hospital.findByIdAndDelete(req.params.hospital_id);
        return res.json({
            ok: true,
            message: 'Hospital eliminated'
        });
    } catch(err) {

        console.log(err);
        return res.status(500).json({
            ok: false,
            message: 'Error to delete hospital'
        });
    };
};

module.exports = {
    getHospital,
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}