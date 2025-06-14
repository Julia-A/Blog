const express = require('express');
const router = express.Router();
const {requireAuth} = require('../middleware/authMiddleware');
const {requireAdmin} = require('../middleware/roleMiddleware');


// GET /
router.get('/', (req, res) => {
  res.render('pages/home');
});


router.get('/admin/dashboard', requireAuth, requireAdmin, (req, res) => {
  res.render('pages/admin-dashboard', {user: req.user});
});


module.exports = router;