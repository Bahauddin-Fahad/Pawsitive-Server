import express from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middleware/validateRequest';
import { commentValidations } from './comment.validation';
import { CommentControllers } from './comment.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.USER),
  validateRequest(commentValidations.createCommentValidationSchema),
  CommentControllers.createComment,
);

router.put(
  '/:id',
  auth(USER_ROLE.USER),
  validateRequest(commentValidations.updateCommentValidationSchema),
  CommentControllers.updatePostComment,
);

router.delete(
  '/:id',
  auth(USER_ROLE.USER),
  CommentControllers.deletePostComment,
);

router.get('/', CommentControllers.getPostAllComments);

export const CommentRoutes = router;
