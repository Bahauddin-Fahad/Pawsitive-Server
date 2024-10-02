import { Types } from 'mongoose';

export interface IComment {
  text: string;
  post: Types.ObjectId;
  user: Types.ObjectId;
  email?: string;
}
