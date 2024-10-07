/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Types } from 'mongoose';
import { POST_TYPE } from './post.constant';

export interface IPost {
  title: string;
  category: 'Tip' | 'Story';
  description: string; // HTML template in string format
  image: string;
  postAuthor: Types.ObjectId;
  upvote: Types.ObjectId[];
  downvote: Types.ObjectId[];
  planType: keyof typeof POST_TYPE;
}
