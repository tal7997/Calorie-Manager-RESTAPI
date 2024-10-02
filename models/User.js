/**
 * Developers:
 * First Name: Tal
 * Last Name: Zechariya
 * ID: 318686532
 *
 * First Name: Shay
 * Last Name: Shuv
 * ID: 206842585
 *
 * First Name: Leor
 * Last Name: Marshall
 * ID: 315421990
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
