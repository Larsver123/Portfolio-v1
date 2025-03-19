const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  try {
    const password = await hash('admin123', 12);

    const admin = await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@example.com',
        password,
        role: 'admin',
        isApproved: true,
      },
    });

    console.log('Admin user created:', admin);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 