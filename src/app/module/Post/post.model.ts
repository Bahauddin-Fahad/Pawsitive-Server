import { model, Schema } from 'mongoose';
import { IPost } from './post.interface';
import { POST_TYPE } from './post.constant';

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Tip', 'Story'],
    },
    image: {
      type: String,
      required: true,
    },
    postAuthor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    upvote: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User', // Refers to the User model
      },
    ],
    downvote: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User', // Refers to the User model
      },
    ],
    planType: {
      type: String,
      enum: Object.keys(POST_TYPE),
      default: POST_TYPE.BASIC,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ModelPost = model<IPost>('Post', postSchema);
