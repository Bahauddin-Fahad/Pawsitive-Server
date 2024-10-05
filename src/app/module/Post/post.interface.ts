/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Types } from 'mongoose';
import { POST_STATUS } from './post.constant';

export interface IPost {
  title: string;
  category: 'Tip' | 'Story';
  description: string; // HTML template in string format
  image: string;
  postAuthor: Types.ObjectId;
  upvote: Types.ObjectId[];
  downvote: Types.ObjectId[];
  status: keyof typeof POST_STATUS;
}
