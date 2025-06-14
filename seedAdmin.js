const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        const existing = await User.findOne({email: process.env.ADMIN_EMAIL});
        if (existing) {
            console.log("Admin already exists");
            process.exit();
        }

        const admin = new User({
            username: process.env.ADMIN_USERNAME,
            email: process.env.ADMIN_EMAIL.toLowerCase(),
            password: process.env.ADMIN_PASSWORD,  // Passing the plain password because the pre('save') hook in the User.js file hashes it instead
            role: 'admin'
        });

        await admin.save();
        console.log("Admin account created!");
        process.exit();
    })
    .catch(err => console.log(err));