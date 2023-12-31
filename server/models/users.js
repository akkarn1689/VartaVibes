const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: 'string',
        required: true,
        unique: true 
    },
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true,
        unique: true
    }
}, {timestamps: true});


module.exports = mongoose.model('User', UserSchema);
