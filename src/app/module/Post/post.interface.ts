import { Types } from 'mongoose';
import { POST_TYPE } from './post.constant';

export interface IPost {
  title: string;
  category: 'Tip' | 'Story';
  description: string;
  image: string;
  postAuthor: Types.ObjectId;
  upvote: Types.ObjectId[];
  downvote: Types.ObjectId[];
  planType: keyof typeof POST_TYPE;
}
