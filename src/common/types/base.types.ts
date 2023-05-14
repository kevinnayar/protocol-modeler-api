import { z } from 'zod';

export const AppVersionSchema = z.object({
  version: z.string(),
});

export type AppVersionType = z.infer<typeof AppVersionSchema>;
