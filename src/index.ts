import path from 'path'
process.env.NODE_CONFIG_DIR = path.resolve(__dirname, '../src/config')

import { startServer } from '@/infrastructure/server'
import { prisma } from '@/infrastructure/rdb/client'
;(async () => {
  try {
    await prisma.$queryRaw`SELECT 1`
    await startServer()
  } catch (e) {
    console.error(e)
  }
})()
