import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get('/', auth(USER_ROLE.ADMIN), UserControllers.getAllUsers);

router
  .route('/:id')
  .get(UserControllers.getSingleUser)
  .put(
    auth(USER_ROLE.USER, USER_ROLE.ADMIN),
    validateRequest(UserValidation.updateUserValidationSchema),
    UserControllers.updateUser,
  )
  .delete(auth(USER_ROLE.ADMIN), UserControllers.deleteUser);

router
  .route('/:followedId/follow')
  .post(auth(USER_ROLE.USER, USER_ROLE.ADMIN), UserControllers.addFollowing)
  .delete(
    auth(USER_ROLE.USER, USER_ROLE.ADMIN),
    UserControllers.removeFollowing,
  );

router.put(
  '/premium/start-premium',
  auth(USER_ROLE.USER),
  validateRequest(UserValidation.getPremiumValidationSchema),
  UserControllers.startPremium,
);

export const UserRoutes = router;
