// app/api/utility/prismaClient.js
import { PrismaClient } from '@prisma/client';
import { getDatabaseUrl } from './getDatabaseUrl';

const databaseUrl = getDatabaseUrl();
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});

export default prisma;
