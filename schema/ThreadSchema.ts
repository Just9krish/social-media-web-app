import { z } from 'zod';

export const createThreadSchema = z.object({
  content: z.string().trim(),
});

export type CreateThreadInput = z.infer<typeof createThreadSchema>;

export const createReplySchema = z.object({
  content: z.string().min(1, { message: 'Reply content is required' }).trim(),
  threadId: z.string().uuid(),
});

export type ReplyInput = z.infer<typeof createReplySchema>;
