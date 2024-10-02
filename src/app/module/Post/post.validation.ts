import { z } from 'zod';

const createPostValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Post title is required',
        invalid_type_error: 'Post title must be a string',
      })
      .trim(),
    category: z.enum([
      'Adventure',
      'Business Travel',
      'Exploration',
      'Family Travel',
      'Luxury Travel',
      'Budget Travel',
    ]),
    description: z
      .string({
        required_error: 'Post description is required',
        invalid_type_error: 'Post description must be a string',
      })
      .trim(),
    image: z.string().url('Image URL is required and must be valid'),
  }),
});

export const PostValidations = {
  createPostValidationSchema,
};
