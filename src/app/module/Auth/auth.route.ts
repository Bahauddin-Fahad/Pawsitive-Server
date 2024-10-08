import express from 'express';
import validateRequest, {
  validateRequestCookies,
} from '../../middleware/validateRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
// import auth from '../../middleware/auth';
// import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(AuthValidation.signupValidationSchema),
  AuthControllers.signupUser,
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

// router.post(
//   '/change-password',
//   auth(USER_ROLE.USER, USER_ROLE.ADMIN),
//   validateRequest(AuthValidation.changePasswordValidationSchema),
//   AuthControllers.changePassword,
// );

router.post(
  '/refresh-token',
  validateRequestCookies(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);
router.post(
  '/forget-password',
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword,
);

router.post(
  '/reset-password',
  validateRequest(AuthValidation.resetPasswordValidationSchema),
  AuthControllers.resetPassword,
);
export const AuthRoutes = router;
