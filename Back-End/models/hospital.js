'use strict'

const { Schema, model} = require('mongoose');

const HospitalSchema = Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    user: {
        //hacemos referencia al modelo de User
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
    //en caso de querer cambiar el nombre a la colección que se guarda en la base de datos
    //{ collection: 'hospitales'}
);

HospitalSchema.method('toJSON', function() {
    const { __v, ...object} = this.toObject();
    return object;
})

module.exports = model('Hospital', HospitalSchema);