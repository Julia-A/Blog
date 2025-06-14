const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


// Show the registration form
router.get('/register', authController.showRegister);

// Handle registeration form submission
router.post('/register', authController.registerUser);


// Show the register-success page
router.get('/register-success', (req, res) => {
    res.render('pages/register-success');
});


//  Show login form
router.get('/login', authController.showLogin);

// Handle logging in
router.post('/login', authController.loginUser);

// Show Login success
router.get('/login-success', (req, res) => {
    res.render('pages/login-success');
});


// Logout route
router.get('/logout', (req, res) => {
    res.clearCookie('token'); // Remove the JWT
    res.redirect('/');  // Go back to the homepage
});








module.exports = router;