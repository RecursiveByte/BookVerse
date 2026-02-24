import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "../../generated/prisma/client"

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ 
  connectionString,
  ssl: {
    ca: process.env.CA_CERT
  }
})

const prisma = new PrismaClient({ adapter })
export { prisma }
