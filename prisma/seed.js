const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Check if admin user already exists
  const existingAdmin = await prisma.user.findFirst({
    where: {
      OR: [
        { email: 'admin@test.com' },
        { username: 'admin' }
      ]
    }
  });

  if (existingAdmin) {
    console.log('Admin user already exists');
    return;
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@test.com',
      password: hashedPassword,
    },
  });

  console.log('Admin user created:', adminUser.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
