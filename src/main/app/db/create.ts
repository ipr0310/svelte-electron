import { drizzle } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { is } from '@electron-toolkit/utils'
import DatabaseCreation from 'better-sqlite3'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createDatabase = () => {
  try {
    const devMigrationPath = './drizzle'
    const migrateProductionPath = './resources/app.asar.unpacked/drizzle'

    const sqlite = new DatabaseCreation('database.sqlite')
    const db = drizzle(sqlite)
    migrate(db, {
      migrationsFolder: is.dev ? devMigrationPath : migrateProductionPath
    })
    sqlite.close()
  } catch (error) {
    console.error(error)
  }
}
