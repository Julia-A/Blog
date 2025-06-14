// only allow admins to access the admin dashboard

exports.requireAdmin = (req, res, next) => {
    if(req.user.role !== 'admin') {
        return res.render('pages/success', {message: "Access denied. Admins only."});
    }
    next();
};