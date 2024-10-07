import express from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middleware/validateRequest';
import { commentValidations } from './comment.validation';
import { CommentControllers } from './comment.controller';

const router = express.Router();

router
  .route('/')
  .get(CommentControllers.getPostAllComments)
  .post(
    auth(USER_ROLE.USER),
    validateRequest(commentValidations.createCommentValidationSchema),
    CommentControllers.createComment,
  );

router
  .route('/:id')
  .put(
    auth(USER_ROLE.USER),
    validateRequest(commentValidations.updateCommentValidationSchema),
    CommentControllers.updatePostComment,
  )
  .delete(auth(USER_ROLE.USER), CommentControllers.deletePostComment);

export const CommentRoutes = router;
