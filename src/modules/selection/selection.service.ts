import { prisma } from "@/core/config/prisma";

export const SelectionService = {
  async runSelection() {
    const registrations = await prisma.registration.findMany({
      where: {
        status: "VERIFIED",
      },
      include: {
        scores: true,
      },
    });

    if (!registrations.length) {
      throw new Error("No verified registrations");
    }

    const scored = registrations.map((r) => {
      const avg =
        r.scores.reduce((acc, s) => acc + s.value, 0) / (r.scores.length || 1);

      return {
        id: r.id,
        avg,
      };
    });

    scored.sort((a, b) => b.avg - a.avg);

    const quotaSetting = await prisma.setting.findUnique({
      where: { key: "SELECTION_QUOTA" },
    });

    const quota = quotaSetting ? Number(quotaSetting.value) : scored.length;

    return prisma.$transaction(
      scored.map((s, index) =>
        prisma.registration.update({
          where: { id: s.id },
          data: {
            selectionScore: s.avg,
            selectionStatus: index < quota ? "PASSED" : "FAILED",
          },
        }),
      ),
    );
  },

  async getRanking() {
    return prisma.registration.findMany({
      where: {
        status: "VERIFIED",
      },
      orderBy: {
        selectionScore: "desc",
      },
      select: {
        id: true,
        namaLengkap: true,
        selectionScore: true,
        selectionStatus: true,
      },
    });
  },
};
