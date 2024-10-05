import httpStatus from 'http-status';
import { sendResponse } from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.services';

const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users Retrieved Successfully',
    data: users,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const user = await UserServices.getSingleUserFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Retrieved Successfully',
    data: user,
  });
});

const addFollowing = catchAsync(async (req, res) => {
  const result = await UserServices.addFollowingIntoDB(
    req.params.followedId,
    req.user,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'You followed successfully',
    data: result,
  });
});

const removeFollowing = catchAsync(async (req, res) => {
  const result = await UserServices.removeFollowingFromDB(
    req.params.followedId,
    req.user,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'You unfollowed successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserServices.updateUserIntoDB(req.body, id, req.user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User updated successfully',
    data: result,
  });
});

const startPremium = catchAsync(async (req, res) => {
  const result = await UserServices.startPremiumIntoDB(req.body, req.user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Premium Subscription successful!',
    data: result?.result,
    paymentSession: result?.paymentSession,
  });
});

export const UserControllers = {
  getSingleUser,
  getAllUsers,
  addFollowing,
  removeFollowing,
  updateUser,
  startPremium,
};
