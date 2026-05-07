import { t } from 'i18next';
import { z } from 'zod';

export const verifyNumberSchema = z.object({
  code: z
    .string()
    .min(6, t('6-digit code is required'))
    .max(6, t('6-digit code is required')),
});

export type VerifyNumberSchemaType = z.infer<typeof verifyNumberSchema>;
