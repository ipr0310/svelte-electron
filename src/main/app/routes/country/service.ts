import { db } from '../../db'
import { countries } from '../../db/schema'
import type { Country, NewCountry } from './model'

export const getCountries = async (): Promise<Country[]> => {
  const result: Country[] = await db.select().from(countries)
  return result
}

export const insertCountry = async (country: NewCountry): Promise<{ success: true }> => {
  const result = await db.insert(countries).values(country)
  if (!result.changes) throw new Error('Country Insert Error')

  return { success: true }
}
