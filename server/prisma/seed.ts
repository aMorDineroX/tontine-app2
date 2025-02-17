import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clean the database
  await prisma.payment.deleteMany();
  await prisma.tontineMember.deleteMany();
  await prisma.tontine.deleteMany();
  await prisma.user.deleteMany();

  // Create test users
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const user1 = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'member@example.com',
      name: 'Member User',
      password: hashedPassword,
    },
  });

  // Create a test tontine
  const tontine = await prisma.tontine.create({
    data: {
      name: 'Test Tontine',
      description: 'A test tontine group',
      amount: 1000,
      frequency: 'MONTHLY',
      membersCount: 2,
      startDate: new Date(),
      endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 2), // 2 months from now
      status: 'ACTIVE',
      creatorId: user1.id,
      totalRounds: 2,
    },
  });

  // Add members to the tontine
  await prisma.tontineMember.create({
    data: {
      userId: user1.id,
      tontineId: tontine.id,
      position: 1,
      status: 'ACTIVE',
      nextPaymentDate: new Date(),
    },
  });

  await prisma.tontineMember.create({
    data: {
      userId: user2.id,
      tontineId: tontine.id,
      position: 2,
      status: 'ACTIVE',
      nextPaymentDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 1 month from now
    },
  });

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });