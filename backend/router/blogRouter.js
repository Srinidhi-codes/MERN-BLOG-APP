import express from 'express';
import { createBlog, deleteBlog, getAllBlog, getBlogById, getFeaturedBlog, likeBlog, updateBlog } from '../controller/blogController.js';
import requireSignIn from '../middleware/authMiddleware.js'

//Router Object
const router = express.Router();

// Blog 
router.get('/', requireSignIn, getAllBlog);
router.get('/:id', requireSignIn, getBlogById);
router.get('/featured', requireSignIn, getFeaturedBlog);
router.post('/', requireSignIn, createBlog);
router.put('/:id', requireSignIn, updateBlog);
router.put('/like/:id', requireSignIn, likeBlog);
router.delete('/:id', requireSignIn, deleteBlog);

export default router;