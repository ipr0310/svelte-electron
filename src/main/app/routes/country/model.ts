import { countries } from '../../db/schema'

export type Country = typeof countries.$inferSelect
export type NewCountry = typeof countries.$inferInsert
