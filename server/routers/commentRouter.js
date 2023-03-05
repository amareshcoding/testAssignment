import { Router } from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import {
  commentOnAPost,
  commentOnAComment,
  likeAComment,
} from '../controllers/commentController.js';
const commentRouter = Router();

commentRouter.post('/commentOnPost/:postId', verifyToken, commentOnAPost);
commentRouter.post(
  '/commentOnComment/:commentId',
  verifyToken,
  commentOnAComment
);
commentRouter.patch('/like/:commentId', verifyToken, likeAComment);

export default commentRouter;
