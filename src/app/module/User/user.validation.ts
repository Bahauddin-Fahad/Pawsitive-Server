import { z } from 'zod';
import { USER_ROLE, USER_PLANTYPE } from './user.constant';

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    role: z.nativeEnum(USER_ROLE).optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    planType: z.nativeEnum(USER_PLANTYPE).optional(),
    profilePhoto: z
      .string()
      .url('Image URL is required and must be valid')
      .optional(),
  }),
});

const getPremiumValidationSchema = z.object({
  body: z.object({
    transactionId: z.string({
      required_error: 'TransactionId is required',
    }),
    paymentStatus: z
      .string({
        required_error: 'Payment Status is required',
        invalid_type_error: 'Payment Status must be a string',
      })
      .trim(),
    // premiumStart: z
    //   .string({
    //     required_error: 'Premium Start Date is required',
    //   })
    //   .trim(),
    // premiumEnd: z
    //   .string({
    //     required_error: 'Premium End Date is required',
    //   })
    //   .trim(),
    // premiumCharge: z.number().nonnegative().min(1),
  }),
});

export const UserValidation = {
  updateUserValidationSchema,
  getPremiumValidationSchema,
};
