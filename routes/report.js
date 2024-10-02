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
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Calorie = require('../models/Calorie');

// GET report for a specific user, month, and year
router.get('/', async function(req, res, next) {
    try {
        // Retrieve the parameters from the request
        let { user_id, month, year } = req.query;

        // Get current date
        const currentDate = new Date();

        // If year, month, or day are not provided in the request body, use current date as default
        const current_year = currentDate.getFullYear();
        const current_month = (currentDate.getMonth() + 1); // getMonth() returns 0-based index, so we add 1

        console.log(req.query);

        // Trim any whitespace or newline characters from the parameters
        user_id = user_id?.trim() || '';
        month = month?.trim() || '';
        year = year?.trim() || '';

        // Handle issue with missing or trimmed values
        req.query = { user_id, month, year };
        console.log(year);
        console.log(req.query);

        // Ensure that all required parameters are provided
        if (!user_id || !month || !year) {
            return res.status(400).json({ message: 'Missing user_id, month, or year' });
        }

        // Check if the user exists in the users collection by 'id' using Mongoose
        const user = await User.findOne({ id: parseInt(user_id) });

        if (!user) {
            // If the user doesn't exist, return an error
            return res.status(404).json({ message: 'User not found. Please register the user first.' });
        }

        // Validate that the requested year and month are not in the future
        if (year > current_year || (year === current_year && month > current_month)) {
            return res.status(400).json({ message: 'Invalid date. Cannot query future entries.' });
        }

        // Query to fetch calories entries for the specified user, month, and year using Mongoose
        const caloriesEntries = await Calorie.find({
            user_id: parseInt(user_id),
            month: parseInt(month),
            year: parseInt(year)
        });

        console.log(caloriesEntries);

        // Organize the data by category
        const report = {
            breakfast: [],
            lunch: [],
            dinner: [],
            other: []
        };

        // Go through all entries and place them in the correct category
        caloriesEntries.forEach(entry => {
            const { category, day, description, amount } = entry;

            const item = {
                day: day,
                description: description,
                amount: amount
            };

            if (category.toLowerCase() === 'breakfast') {
                report.breakfast.push(item);
            } else if (category.toLowerCase() === 'lunch') {
                report.lunch.push(item);
            } else if (category.toLowerCase() === 'dinner') {
                report.dinner.push(item);
            } else {
                report.other.push(item);
            }
        });

        // Return the report
        console.log(report);
        res.status(200).json(report);
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ message: 'Failed to generate report', error });
    }
});

module.exports = router;
