import path from 'path'
process.env.NODE_CONFIG_DIR = path.resolve(__dirname, '../src/config')

import { startServer } from '@/infrastructure/server'
import { dbClient } from '@/infrastructure/rdb/client'
;(async () => {
  try {
    await dbClient.$queryRaw`SELECT 1`
    await startServer()
  } catch (e) {
    console.error(e)
  }
})()
