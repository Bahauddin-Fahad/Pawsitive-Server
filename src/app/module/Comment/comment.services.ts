import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ModelUser } from '../User/user.model';
import { IComment } from './comment.interface';
import { ModelComment } from './comment.model';
import { QueryBuilder } from '../../builder/QueryBuilder';

const createCommentIntoDB = async (payload: Partial<IComment>) => {
  const { email, ...remaining } = payload;

  const user = await ModelUser.isUserExistsByEmail(email as string);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User doesn't exist!");
  }

  const result = (await ModelComment.create(remaining)).populate([
    { path: 'user' },
    { path: 'post' },
  ]);

  return result;
};

const getPostAllCommentsFromDB = async (query: Record<string, unknown>) => {
  const commentQuery = new QueryBuilder(
    ModelComment.find().populate([{ path: 'user' }, { path: 'post' }]),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await commentQuery.countTotal();
  const result = await commentQuery.modelQuery;

  if (result.length === 0) {
    return null;
  }

  return { meta, result };
};

const updatePostCommentIntoDB = async (
  payload: Partial<IComment>,
  id: string,
) => {
  const result = await ModelComment.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const deletePostCommentFromDB = async (id: string) => {
  const result = await ModelComment.findByIdAndDelete(id);
  return result;
};

export const CommentServices = {
  createCommentIntoDB,
  getPostAllCommentsFromDB,
  updatePostCommentIntoDB,
  deletePostCommentFromDB,
};
