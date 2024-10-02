import { z } from 'zod';

const createCommentValidationSchema = z.object({
  body: z.object({
    text: z
      .string({
        required_error: 'Comment is required',
        invalid_type_error: 'Comment must be a string',
      })
      .trim(),
    user: z
      .string({
        required_error: "Comment's User Id is required",
      })
      .trim(),
    post: z
      .string({
        required_error: 'Post Id is required',
      })
      .trim(),
    email: z
      .string({
        required_error: "Comment's User Email is required",
      })
      .email(),
  }),
});

const updateCommentValidationSchema = z.object({
  body: z.object({
    text: z
      .string({
        required_error: 'Comment is required',
        invalid_type_error: 'Comment must be a string',
      })
      .trim(),
  }),
});

export const commentValidations = {
  createCommentValidationSchema,
  updateCommentValidationSchema,
};
