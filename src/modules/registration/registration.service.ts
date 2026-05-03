import { prisma } from "@/core/config/prisma";
import { CreateRegistrationDto } from "./registration.dto";
import { generatePassword, generateUsername } from "@/core/utils/random";
import { hashPassword } from "@/core/utils/hash";
import { sendCredentialEmail } from "@/core/utils/mailer";

export const RegistrationService = {
  async create(data: CreateRegistrationDto) {
    const campaign = await prisma.campaign.findUnique({
      where: { id: data.campaignId },
    });

    if (!campaign || !campaign.isActive) {
      throw new Error("Campaign not found or inactive");
    }

    if (new Date() > campaign.endDate) {
      throw new Error("Campaign expired");
    }

    const username = data.level === "SD" ? generateUsername() : data.nisn;

    const password = generatePassword();
    const hashed = await hashPassword(password);

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          username,
          password: hashed,
          role: "STAFF",
          mustChangePassword: true,
        },
      });

      const registration = await tx.registration.create({
        data: {
          nisn: data.nisn,
          namaLengkap: data.namaLengkap,
          noHp: data.noHp,
          level: data.level,
          campaignId: data.campaignId,
          userId: user.id,

          payments: {
            create: {
              amount: campaign.price,
            },
          },
        },
        include: {
          payments: true,
        },
      });

      return { user, registration };
    });

    await sendCredentialEmail(data.email, username, password);

    return result.registration;
  },
};
