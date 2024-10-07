import express from 'express';
import { PostValidations } from './post.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middleware/validateRequest';
import { PostControllers } from './post.controller';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.USER),
  validateRequest(PostValidations.createPostValidationSchema),
  PostControllers.createPost,
);

router.post(
  '/:postId/upvote',
  auth(USER_ROLE.USER),
  PostControllers.addPostUpvote,
);

router.post(
  '/:postId/downvote',
  auth(USER_ROLE.USER),
  PostControllers.addPostDownvote,
);

router.delete(
  '/:postId/upvote',
  auth(USER_ROLE.USER),
  PostControllers.removePostUpvote,
);

router.delete(
  '/:postId/downvote',
  auth(USER_ROLE.USER),
  PostControllers.removePostDownvote,
);

router.get(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  PostControllers.getSinglePost,
);

router.put(
  '/:id',
  auth(USER_ROLE.USER),
  validateRequest(PostValidations.updatePostValidationSchema),
  PostControllers.updatePost,
);

router.delete(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  PostControllers.deletePost,
);

router.get('/', PostControllers.getAllPosts);

router.get(
  '/dashboard/users',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  PostControllers.getAllPostsInDashboard,
);

export const PostRoutes = router;
