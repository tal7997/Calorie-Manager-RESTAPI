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
const User = require('../models/User'); // ייבוא מודל המשתמשים
const Calorie = require('../models/Calorie'); // ייבוא מודל הקלוריות
const { v4: uuidv4 } = require('uuid');

// Route to add a new calorie consumption item
router.post('/', async function (req, res, next) {
    try {
        // בדיקה אם המשתמש קיים במאגר בעזרת Mongoose
        const user = await User.findOne({ id: parseInt(req.body.user_id) });

        if (!user) {
            // אם המשתמש לא קיים, נחזיר שגיאה
            return res.status(404).json({ message: 'User not found. Please register the user first.' });
        }

        // קבלת התאריך הנוכחי
        const currentDate = new Date();

        // אם לא נמסר תאריך בבקשה, נשתמש בתאריך הנוכחי כברירת מחדל
        const year = req.body.year || currentDate.getFullYear();
        const month = req.body.month || (currentDate.getMonth() + 1); // getMonth() מחזיר ערך המבוסס על 0, לכן נוסיף 1
        const day = req.body.day || currentDate.getDate();

        // בדיקת תקינות קטגוריה - רק breakfast, lunch, dinner (לא תלוי רישיות), ואם לא תקין נשתמש ב-'other'
        const validCategories = ['breakfast', 'lunch', 'dinner'];
        const categoryInput = req.body.category ? req.body.category.toLowerCase() : 'other'; // Convert to lowercase
        const category = validCategories.includes(categoryInput) ? categoryInput : 'other';

        // בדיקת תקינות של כמות - חייב להיות ערך בין 1 ל-2000
        const amount = parseInt(req.body.amount); // Convert the input to a number
        if (isNaN(amount) || amount < 1 || amount > 2000) {
            return res.status(400).json({ message: 'Invalid amount. The value must be a number between 1 and 2000.' });
        }

        // יצירת רשומת קלוריות חדשה בעזרת Mongoose
        const newCalories = new Calorie({
            id: uuidv4(),
            user_id: req.body.user_id, // Ensure to use the 'id' and not the '_id'
            year: year,
            month: month,
            day: day,
            description: req.body.description,
            category: category,
            amount: amount
        });

        // שמירת רשומת הקלוריות החדשה במסד הנתונים
        await newCalories.save();

        // החזרת תשובה מוצלחת
        res.status(200).json({ message: 'Calorie entry added successfully', data: newCalories });

    } catch (error) {
        console.error('Error adding calories:', error);
        res.status(500).json({ message: 'Failed to add calorie entry', error });
    }
});

module.exports = router;
