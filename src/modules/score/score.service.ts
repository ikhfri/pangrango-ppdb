import { prisma } from "@/core/config/prisma";

type CreateScoreInput = {
  registrationId: string;
  subjectId: string;
  semester: number;
  value: number;
};

function validateSemester(level: string, semester: number) {
  if (level === "SD") {
    throw new Error("SD does not require score input");
  }

  if (level === "SMP") {
    if (semester < 7 || semester > 11) {
      throw new Error("SMP semester must be between 7-11");
    }
  }

  if (level === "SMA") {
    if (semester < 1 || semester > 5) {
      throw new Error("SMA semester must be between 1-5");
    }
  }
}

export const ScoreService = {
  async create(data: CreateScoreInput) {
    const registration = await prisma.registration.findUnique({
      where: { id: data.registrationId },
    });

    if (!registration) throw new Error("Registration not found");

    validateSemester(registration.level, data.semester);

    return prisma.score.create({
      data,
    });
  },

  async bulkCreate(scores: CreateScoreInput[]) {
    return prisma.$transaction(async (tx) => {
      const results = [];

      for (const s of scores) {
        const registration = await tx.registration.findUnique({
          where: { id: s.registrationId },
        });

        if (!registration) {
          throw new Error(`Registration not found: ${s.registrationId}`);
        }

        validateSemester(registration.level, s.semester);

        const created = await tx.score.create({
          data: s,
        });

        results.push(created);
      }

      return results;
    });
  },

  async getByRegistration(registrationId: string) {
    return prisma.score.findMany({
      where: { registrationId },
      include: {
        subject: true,
      },
      orderBy: [{ semester: "asc" }, { subject: { name: "asc" } }],
    });
  },

  async update(id: string, value: number) {
    return prisma.score.update({
      where: { id },
      data: { value },
    });
  },

  async delete(id: string) {
    return prisma.score.delete({
      where: { id },
    });
  },
};
