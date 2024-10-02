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

// const getSinglePost = catchAsync(async (req, res) => {
//   const id = req.params.id;

//   const result = await ServicesOfCarService.getSingleServiceFromDB(id);

//   if (result === null) {
//     return sendResponse(res, {
//       success: false,
//       statusCode: httpStatus.NOT_FOUND,
//       message: 'No Data Found!',
//       data: [],
//     });
//   }

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Service retrieved successfully',
//     data: result,
//   });
// });

// const updatePost = catchAsync(async (req, res) => {
//   const id = req.params.id;

//   const result = await ServicesOfCarService.updateServiceIntoDB(req.body, id);

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Service updated successfully',
//     data: result,
//   });
// });

// const deletePost = catchAsync(async (req, res) => {
//   const id = req.params.id;

//   const result = await ServicesOfCarService.deleteServiceFromDB(id);

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Service deleted successfully',
//     data: result,
//   });
// });

export const PostControllers = {
  createPost,
  getAllPosts,
  //   getSinglePost,
  //   updatePost,
  //   deletePost,
};
