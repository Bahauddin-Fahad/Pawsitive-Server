/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { USER_ROLE, USER_PLANTYPE } from './user.constant';

export type TUser = {
  _id?: string;
  name: string;
  role: keyof typeof USER_ROLE;
  email: string;
  password: string;
  planType: keyof typeof USER_PLANTYPE;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  totalUpvote: number;
  postCount: number;
  paymentStatus?: string;
  transactionId?: string;
  premiumCharge?: number;
  premiumStart?: string;
  premiumEnd?: string;
  profilePhoto?: string;
  passwordChangedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface IUserModel extends Model<TUser> {
  isUserExistsByEmail(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}
