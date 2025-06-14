const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { requireAuth } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/roleMiddleware');

// Show all posts to logged-in users
router.get('/', requireAuth, postController.showAllPosts);

// Admin: Show form to create post
router.get('/admin/create', requireAuth, requireAdmin, postController.showCreateForm);

// Admin: Handle form submission
router.post('/admin/create', requireAuth, requireAdmin, postController.createPost);

// Admin: Delete a post
router.post('/admin/delete/:id', requireAuth, requireAdmin, postController.deletePost);

// Admin: Show edit form
router.get('/admin/edit/:id', requireAuth, requireAdmin, postController.showEditForm);

// Admin: Handle edit submission
router.post('/admin/edit/:id', requireAuth, requireAdmin, postController.updatePost);

// Show a single post to any logged-in user
router.get('/:id', requireAuth, postController.showSinglePost);


module.exports = router;