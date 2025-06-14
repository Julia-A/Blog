const jwt = require('jsonwebtoken');


// Middleware to check if the user is authenticated
exports.requireAuth = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; //Attach user to request
        next();
    } catch (err) {
        return res.redirect('/login');
    }
};