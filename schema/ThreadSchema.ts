import { z } from 'zod';

export const createThreadSchema = z.object({
  content: z.string().trim(),
});

export type CreateThreadInput = z.infer<typeof createThreadSchema>;
