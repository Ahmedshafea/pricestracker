// src/lib/prisma.ts

import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

// في بيئة الإنتاج، ننشئ مثيلًا واحدًا فقط من PrismaClient
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // في بيئة التطوير، نستخدم متغيرًا عامًا (global variable) لضمان أن المثيل لا يُعاد إنشاؤه عند كل "hot reload"
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

export default prisma;