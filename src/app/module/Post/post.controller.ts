import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { PostServices } from './post.services';

const createPost = catchAsync(async (req, res) => {
  const result = await PostServices.createPostIntoDB(req.body, req.user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post created successfully',
    data: result,
  });
});

const getAllPosts = catchAsync(async (req, res) => {
  const result = await PostServices.getAllPostsFromDB(req.query);

  if (result === null) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: [],
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Posts retrieved successfully',
    data: result,
  });
});

const getAllPostsInDashboard = catchAsync(async (req, res) => {
  const result = await PostServices.getAllPostsInDashboard(req.query, req.user);

  if (result === null) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: [],
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Posts retrieved successfully',
    data: result.result,
    meta: result.meta,
  });
});

const addPostUpvote = catchAsync(async (req, res) => {
  const result = await PostServices.addPostUpvoteIntoDB(
    req.params.postId,
    req.user,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'You gave upvote successfully',
    data: result,
  });
});

const addPostDownvote = catchAsync(async (req, res) => {
  const result = await PostServices.addPostDownvoteIntoDB(
    req.params.postId,
    req.user,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'You gave downvote successfully',
    data: result,
  });
});

const removePostUpvote = catchAsync(async (req, res) => {
  const result = await PostServices.removePostUpvoteFromDB(
    req.params.postId,
    req.user,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'You removed upvote successfully',
    data: result,
  });
});

const removePostDownvote = catchAsync(async (req, res) => {
  const result = await PostServices.removePostDownvoteFromDB(
    req.params.postId,
    req.user,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'You removed downvote successfully',
    data: result,
  });
});

const getSinglePost = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await PostServices.getSinglePostFromDB(id);

  if (result === null) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found!',
      data: [],
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post retrieved successfully',
    data: result,
  });
});

const updatePost = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await PostServices.updatePostIntoDB(req.body, id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post updated successfully',
    data: result,
  });
});

const deletePost = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await PostServices.deletePostFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post deleted successfully',
    data: result,
  });
});

export const PostControllers = {
  createPost,
  getAllPosts,
  addPostUpvote,
  removePostUpvote,
  addPostDownvote,
  removePostDownvote,
  getSinglePost,
  getAllPostsInDashboard,
  updatePost,
  deletePost,
};
