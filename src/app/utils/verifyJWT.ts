/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import { USER_ROLE, USER_PLANTYPE } from '../module/User/user.constant';
import { Types } from 'mongoose';

export const createToken = (
  jwtPayload: {
    _id?: string;
    name: string;
    email: string;
    role: keyof typeof USER_ROLE;
    planType: keyof typeof USER_PLANTYPE;
    profilePhoto?: string;
    followers: Types.ObjectId[];
    following: Types.ObjectId[];
    totalUpvote: number;
    postCount: number;
    premiumStart?: string;
    premiumEnd?: string;
  },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (
  token: string,
  secret: string,
): JwtPayload | Error => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error: any) {
    throw new AppError(401, 'You are not authorized!');
  }
};
