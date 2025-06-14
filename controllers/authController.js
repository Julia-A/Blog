const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// show the registration form
exports.showRegister = (req, res) => {
    res.render('pages/register');
};


// Handle user registration
exports.registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        // create the user in the database
        const user = await User.create({ username, email, password});

        // Generate a JWT token
        const token = jwt.sign({id: user._id, role: user.role, username: user.username}, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        // Store token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        // Redirect to success page
        res.render('pages/success', {message: "Registration"});

    } catch(err) {
        console.error(err);
        res.status(500).send("Error registering user");
    }
};


// Show Login form
exports.showLogin = (req, res) => {
    res.render('pages/login');
};

// Handle user login
exports.loginUser = async (req, res) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    console.log(`Login attempt for email: ${email}`)

    try{
        // check if user exists
        const user = await User.findOne({email});
        if (!user) return res.status(401).send('Invalid credentials');

        // compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).send('Wrong password');

        console.log('Login successful for user:', user.username);

        // Generate JWT
        const token = jwt.sign({id: user._id, role: user.role, username: user.username}, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        // Store in cookie
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });


        // Redirect based on role
        if (user.role === 'admin') {
        return res.redirect('/admin/dashboard');
        } else {
        return res.render('pages/success', {message: "Login"});
        }

        
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};