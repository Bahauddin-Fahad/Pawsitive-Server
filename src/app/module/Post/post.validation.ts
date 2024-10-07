import { z } from 'zod';

const createPostValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Post title is required',
        invalid_type_error: 'Post title must be a string',
      })
      .trim(),
    category: z.enum(['Tip', 'Story']),
    description: z
      .string({
        required_error: 'Post description is required',
        invalid_type_error: 'Post description must be a string',
      })
      .trim(),
    image: z.string().url('Image URL is required and must be valid'),
    planType: z
      .string({
        required_error: 'Post Type is required',
      })
      .trim(),
  }),
});

const updatePostValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Post title is required',
        invalid_type_error: 'Post title must be a string',
      })
      .trim()
      .optional(),
    category: z.enum(['Tip', 'Story']).optional(),
    description: z
      .string({
        required_error: 'Post description is required',
        invalid_type_error: 'Post description must be a string',
      })
      .trim()
      .optional(),
    image: z.string().url('Image URL is required and must be valid').optional(),
    planType: z
      .string({
        required_error: 'Post Type is required',
      })
      .trim()
      .optional(),
  }),
});

export const PostValidations = {
  createPostValidationSchema,
  updatePostValidationSchema,
};
