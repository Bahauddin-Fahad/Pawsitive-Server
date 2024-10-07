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

router.get('/', PostControllers.getAllPosts);

export const PostRoutes = router;
