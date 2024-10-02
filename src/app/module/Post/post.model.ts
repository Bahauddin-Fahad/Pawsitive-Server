import { model, Schema } from 'mongoose';
import { IPost } from './post.interface';
import { POST_STATUS } from './post.constant';

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Adventure',
        'Business Travel',
        'Exploration',
        'Family Travel',
        'Luxury Travel',
        'Budget Travel',
      ],
    },
    description: {
      type: String,
      required: true,
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
    upvote: {
      type: Number,
      default: 0,
      required: true,
    },
    downvote: {
      type: Number,
      default: 0,
      required: true,
    },
    status: {
      type: String,
      enum: Object.keys(POST_STATUS),
      default: POST_STATUS.BASIC,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ModelPost = model<IPost>('Post', postSchema);
