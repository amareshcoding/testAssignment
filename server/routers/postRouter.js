import { Router } from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import {
  getFeedPosts,
  likePost,
  getSinglePost,
  createPost,
} from '../controllers/postController.js';
const postRoute = Router();

postRoute.post('/', verifyToken, createPost);
postRoute.get('/', verifyToken, getFeedPosts);
postRoute.get('/:id', verifyToken, getSinglePost);
postRoute.patch('/like/:postId', verifyToken, likePost);

export default postRoute;
