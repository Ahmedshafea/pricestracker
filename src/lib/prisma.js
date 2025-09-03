// src/lib/prisma.js

import { PrismaClient } from '@prisma/client';

let prisma;

// في بيئة الإنتاج، ننشئ مثيلًا واحدًا فقط من PrismaClient
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // في بيئة التطوير، نستخدم متغيرًا عامًا (global variable) لضمان أن المثيل لا يُعاد إنشاؤه عند كل "hot reload"
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;