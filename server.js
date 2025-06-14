const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const setUser = require('./middleware/setUserMiddleware');
const path = require('path');
require('dotenv').config();

const app = express();


// Middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(setUser);
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

// Routes
const pageRoutes = require('./routes/pageRoutes');
app.use('/', pageRoutes);
const authRoutes = require('./routes/authRoutes');
app.use('/', authRoutes);
const postRoutes = require('./routes/postRoutes');
app.use('/posts', postRoutes);


// DB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(3000, () => console.log("Server running on http://localhost:3000"));
    })
    .catch(err => console.log(err));