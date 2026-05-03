import "dotenv/config";
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding users (admin)...");

  const password = "admin123"; // ganti kalau mau
  const hashedPassword = await bcrypt.hash(password, 10);

  // SUPER ADMIN
  await prisma.user.upsert({
    where: { username: "superadmin" },
    update: {},
    create: {
      username: "superadmin",
      password: hashedPassword,
      role: Role.SUPER_ADMIN,
      mustChangePassword: false,
    },
  });

  // ADMIN PPDB
  await prisma.user.upsert({
    where: { username: "adminppdb" },
    update: {},
    create: {
      username: "adminppdb",
      password: hashedPassword,
      role: Role.ADMIN_PPDB,
      mustChangePassword: false,
    },
  });

  console.log("✅ Admin users seeded");
  console.log("👤 superadmin / admin123");
  console.log("👤 adminppdb / admin123");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
