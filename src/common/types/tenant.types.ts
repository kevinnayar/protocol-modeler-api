import { z } from 'zod';

export const TenantSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type TenantType = z.infer<typeof TenantSchema>;
