import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ModelUser } from '../User/user.model';
import { IPost } from './post.interface';
import { ModelPost } from './post.model';
import { PostQueryBuilder } from '../../builder/PostQueryBuilder';
import { postSearchableFields } from './post.constant';

const createPostIntoDB = async (
  payload: Partial<IPost>,
  userData: Record<string, unknown>,
) => {
  const { email } = userData;

  const user = await ModelUser.isUserExistsByEmail(email as string);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User doesn't exist!");
  }

  const postData = { ...payload, postAuthor: user?._id };

  const result = (await ModelPost.create(postData)).populate('postAuthor');
  return result;
};

const getAllPostsFromDB = async (query: Record<string, unknown>) => {
  const postQuery = new PostQueryBuilder(ModelPost.find(), query)
    .search(postSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await postQuery.countTotal();
  const result = await postQuery.modelQuery;

  if (result.length === 0) {
    return null;
  }

  return { meta, result };
};

// const getSingleServiceFromDB = async (id: string) => {
//   const singleService = await CarService.findById(id);

//   if (singleService?.isDeleted) {
//     return null;
//   } else {
//     return singleService;
//   }
// };

// const updateServiceIntoDB = async (
//   payload: Partial<ICarService>,
//   id: string,
// ) => {
//   const result = await CarService.findByIdAndUpdate(id, payload, {
//     new: true,
//   });

//   return result;
// };

// const deleteServiceFromDB = async (id: string) => {
//   const result = await CarService.findByIdAndUpdate(
//     id,
//     {
//       isDeleted: true,
//     },
//     {
//       new: true,
//     },
//   );

//   return result;
// };

export const PostServices = {
  createPostIntoDB,
  getAllPostsFromDB,
  //   getSingleServiceFromDB,
  //   updateServiceIntoDB,
  //   deleteServiceFromDB,
};
