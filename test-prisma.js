const { PrismaClient } = require('@prisma/client');
console.log('PrismaClient', typeof PrismaClient);
const p = new PrismaClient();
console.log('instantiated');
void p.$disconnect();
