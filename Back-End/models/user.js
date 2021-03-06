'use strict'

const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }
})

//mediante este método modificamos el nombre de los atributos del objeto sin modificar los mismo en la base de datos. Es solo para fines visuales
UserSchema.method('toJSON', function() {
    //indicamos que valores no queremos mostrar
    const { __v, _id, password, ...object} = this.toObject();
    //cambiamos el nombre del atributo
    object.user_id = _id;
    return object;
})

module.exports = model('User', UserSchema);