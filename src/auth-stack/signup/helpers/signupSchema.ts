import { t } from 'i18next';
import { z } from 'zod';

export const signupSchema = z.object({
  phone: z
    .string()
    .min(1, t('Phone number is required'))
    .max(15, t('Phone number too long'))
    .regex(/^[0-9+]+$/, t('Invalid phone number')),
});

export type LoginSchemaType = z.infer<typeof signupSchema>;
