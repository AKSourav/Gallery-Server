const express = require('express');
const {getAllPosts,getAdminPosts,getPost,createPost,updatePost, deletePost} = require('../controllers/postControllers')
const {protect} =require("../middleware/authMiddleware")
const router= express.Router();

router.get('/',protect,getAllPosts);
router.get('/admin',protect,getAdminPosts);
router.get('/:postId',protect,getPost);
router.delete('/:postId',protect,deletePost);
router.post('/',protect,createPost);
router.patch('/',protect,updatePost);

module.exports  = router;