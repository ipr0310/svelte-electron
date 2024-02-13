import type { Config } from 'drizzle-kit'

export default {
  schema: './src/main/app/db/schema.ts',
  out: './drizzle',
  driver: 'better-sqlite',
  verbose: true,
  strict: true
} satisfies Config
