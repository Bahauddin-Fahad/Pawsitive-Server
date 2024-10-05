import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/:followedId/follow',
  auth(USER_ROLE.USER),
  UserControllers.addFollowing,
);

router.delete(
  '/:followedId/follow',
  auth(USER_ROLE.USER),
  UserControllers.removeFollowing,
);

router.put(
  '/:id',
  auth(USER_ROLE.USER),
  validateRequest(UserValidation.updateUserValidationSchema),
  UserControllers.updateUser,
);

router.put(
  '/premium/start-premium',
  auth(USER_ROLE.USER),
  validateRequest(UserValidation.getPremiumValidationSchema),
  UserControllers.startPremium,
);

router.get('/', auth(USER_ROLE.ADMIN), UserControllers.getAllUsers);
router.get('/:id', UserControllers.getSingleUser);

export const UserRoutes = router;
