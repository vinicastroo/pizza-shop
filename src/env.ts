import { z } from 'zod'

const envScehma = z.object({
  VITE_API_URL: z.string(),
  MODE: z.enum(['production', 'development', 'test']),
  VITE_ENABLE_API_DELAY: z.string().transform((value) => value === 'true'),
})

export const env = envScehma.parse(import.meta.env)
