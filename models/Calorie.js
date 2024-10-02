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

const calorieSchema = new Schema({
    user_id: {
        type: Number,
        required: true//ask
    },
    year: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['breakfast', 'lunch', 'dinner', 'other'],
        default: 'other'
    },
    amount: {
        type: Number,
        min: 1,
        max: 2000,
        required: true
    }
});

const Calorie = mongoose.model('Calorie', calorieSchema);

module.exports = Calorie;
