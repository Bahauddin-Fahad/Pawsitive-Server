import express from 'express';
import { PostValidations } from './post.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middleware/validateRequest';
import { PostControllers } from './post.controller';

const router = express.Router();

router
  .route('/')
  .get(PostControllers.getAllPosts)
  .post(
    auth(USER_ROLE.USER),
    validateRequest(PostValidations.createPostValidationSchema),
    PostControllers.createPost,
  );

router
  .route('/:id')
  .get(auth(USER_ROLE.ADMIN, USER_ROLE.USER), PostControllers.getSinglePost)
  .put(
    auth(USER_ROLE.USER),
    validateRequest(PostValidations.updatePostValidationSchema),
    PostControllers.updatePost,
  )
  .delete(auth(USER_ROLE.ADMIN, USER_ROLE.USER), PostControllers.deletePost);

router.get(
  '/dashboard/users',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  PostControllers.getAllPostsInDashboard,
);

router
  .route('/:postId/upvote')
  .post(auth(USER_ROLE.USER), PostControllers.addPostUpvote)
  .delete(auth(USER_ROLE.USER), PostControllers.removePostUpvote);

router
  .route('/:postId/downvote')
  .post(auth(USER_ROLE.USER), PostControllers.addPostDownvote)
  .delete(auth(USER_ROLE.USER), PostControllers.removePostDownvote);

export const PostRoutes = router;
