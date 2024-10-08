import httpStatus from 'http-status';
import { QueryBuilder } from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { USER_PLANTYPE, UserSearchableFields } from './user.constant';
import { ModelUser } from './user.model';
import mongoose from 'mongoose';
import { TUser } from './user.interface';
import { initiatePayment } from '../../utils/payment';

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(ModelUser.find(), query)
    .search(UserSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;

  if (result.length === 0) {
    return null;
  }

  return { meta, result };
};

const getSingleUserFromDB = async (id: string) => {
  const user = await ModelUser.findById(id);

  return user;
};

const updateUserIntoDB = async (
  payload: Partial<TUser>,
  id: string,
  userData: Record<string, unknown>,
) => {
  const { email } = userData;

  const user = await ModelUser.isUserExistsByEmail(email as string);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User doesn't exist!");
  }

  const result = await ModelUser.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

const deleteUserFromDB = async (id: string, ) => {
  const result = await ModelUser.findByIdAndUpdate(id, {isDeleted:true}, {
    new: true,
  });

  return result;
};
const addFollowingIntoDB = async (
  followedId: string,
  userData: Record<string, unknown>,
) => {
  const { email, _id } = userData;

  const user = await ModelUser.isUserExistsByEmail(email as string);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User doesn't exist!");
  }

  const isAlreadyFollowing = await ModelUser.findOne({
    _id,
    following: followedId,
  });

  if (isAlreadyFollowing) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'User is already following this profile!',
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result = await ModelUser.findByIdAndUpdate(
      _id,
      { $addToSet: { following: followedId } }, // Use $addToSet to avoid duplicates
      { new: true, runValidators: true, session },
    ).populate('following');

    await ModelUser.findByIdAndUpdate(
      followedId,
      { $addToSet: { followers: _id } }, // Use $addToSet to avoid duplicates
      { new: true, runValidators: true, session },
    ).populate('followers');

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

const removeFollowingFromDB = async (
  followedId: string,
  userData: Record<string, unknown>,
) => {
  const { email, _id } = userData;

  const user = await ModelUser.isUserExistsByEmail(email as string);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User doesn't exist!");
  }

  const isAlreadyFollowing = await ModelUser.findOne({
    _id,
    following: followedId,
  });

  if (!isAlreadyFollowing) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'User is not following this profile!',
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result = await ModelUser.findByIdAndUpdate(
      _id,
      { $pull: { following: followedId } }, // Use $addToSet to avoid duplicates
      { new: true, runValidators: true, session },
    ).populate('following');

    await ModelUser.findByIdAndUpdate(
      followedId,
      { $pull: { followers: _id } }, // Use $addToSet to avoid duplicates
      { new: true, runValidators: true, session },
    ).populate('followers');

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

const startPremiumIntoDB = async (
  payload: Partial<TUser>,
  userData: Record<string, unknown>,
) => {
  const { email, _id } = userData;

  const user = await ModelUser.isUserExistsByEmail(email as string);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User doesn't exist!");
  }

  const updatedUserInfo = {
    ...payload,
    planType: USER_PLANTYPE.PREMIUM,
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result = await ModelUser.findByIdAndUpdate(_id, updatedUserInfo, {
      new: true,
    });

    const paymentData = {
      transactionId: payload?.transactionId,
      amount: payload?.premiumCharge,
      customerName: user.name,
      customerEmail: user.email,
    };

    const paymentSession = await initiatePayment(paymentData);

    await session.commitTransaction();
    await session.endSession();

    return { paymentSession, result };
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const UserServices = {
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  addFollowingIntoDB,
  removeFollowingFromDB,
  startPremiumIntoDB,
};
