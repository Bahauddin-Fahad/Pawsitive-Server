/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { createToken } from '../../utils/verifyJWT';
import { USER_ROLE } from '../User/user.constant';
import { ModelUser } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import AppError from '../../errors/AppError';
import { TUser } from '../User/user.interface';
import { sendEmail } from '../../utils/sendEmail';

const signupUserToDB = async (payload: TUser) => {
  // checking if the user is exist
  const user = await ModelUser.isUserExistsByEmail(payload?.email);

  if (user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is already exist!');
  }

  payload.role = USER_ROLE.USER;

  // // create new user
  const newUser = await ModelUser.create(payload);

  const jwtPayload = {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    planType: newUser.planType,
    profilePhoto: newUser.profilePhoto,
    followers: newUser.followers,
    following: newUser.following,
    totalUpvote: newUser.totalUpvote,
    postCount: newUser.postCount,
    premiumStart: newUser.premiumStart,
    premiumEnd: newUser.premiumEnd,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const loginUserfromDB = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await ModelUser.isUserExistsByEmail(payload?.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  //checking if the password is correct

  if (!(await ModelUser.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client

  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    profilePhoto: user.profilePhoto,
    role: user.role,
    planType: user.planType,
    followers: user.followers,
    following: user.following,
    totalUpvote: user.totalUpvote,
    postCount: user.postCount,
    premiumStart: user.premiumStart,
    premiumEnd: user.premiumEnd,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

// const changePassword = async (
//   userData: JwtPayload,
//   payload: { oldPassword: string; newPassword: string },
// ) => {
//   // checking if the user is exist
//   const user = await ModelUser.isUserExistsByEmail(userData.email);

//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
//   }

//   //checking if the password is correct

//   if (!(await ModelUser.isPasswordMatched(payload.oldPassword, user?.password)))
//     throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

//   //hash new password
//   const newHashedPassword = await bcrypt.hash(
//     payload.newPassword,
//     Number(config.bcrypt_salt_rounds),
//   );

//   await ModelUser.findOneAndUpdate(
//     {
//       email: userData.email,
//       role: userData.role,
//     },
//     {
//       password: newHashedPassword,
//       passwordChangedAt: new Date(),
//     },
//   );

//   return null;
// };

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { email, iat } = decoded;

  // checking if the user is exist
  const user = await ModelUser.isUserExistsByEmail(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  if (
    user.passwordChangedAt &&
    ModelUser.isJWTIssuedBeforePasswordChanged(
      user.passwordChangedAt,
      iat as number,
    )
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
  }

  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    profilePhoto: user.profilePhoto,
    role: user.role,
    planType: user.planType,
    followers: user.followers,
    following: user.following,
    totalUpvote: user.totalUpvote,
    postCount: user.postCount,
    premiumStart: user.premiumStart,
    premiumEnd: user.premiumEnd,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

const forgetPassword = async (userEmail: string) => {
  const user = await ModelUser.isUserExistsByEmail(userEmail);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User does not exist!');
  }

  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    profilePhoto: user.profilePhoto,
    role: user.role,
    planType: user.planType,
    followers: user.followers,
    following: user.following,
    totalUpvote: user.totalUpvote,
    postCount: user.postCount,
    premiumStart: user.premiumStart,
    premiumEnd: user.premiumEnd,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '20m',
  );

  const resetUILink = `${config.reset_pass_ui_link}?email=${user.email}&token=${resetToken} `;

  sendEmail(user.email, resetUILink);
};
const resetPassword = async (
  payload: { email: string; newPassword: string },
  token: string,
) => {
  // checking if the user is exist
  const user = await ModelUser.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  if (payload.email !== decoded.email) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!');
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await ModelUser.findOneAndUpdate(
    {
      email: decoded.email,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};
export const AuthServices = {
  signupUserToDB,
  loginUserfromDB,
  // changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
