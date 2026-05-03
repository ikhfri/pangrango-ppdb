import { prisma } from "@/core/config/prisma";

export const SubjectService = {
  create(data: any) {
    return prisma.subject.create({ data });
  },

  findAll() {
    return prisma.subject.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
  },

  delete(id: string) {
    return prisma.subject.delete({ where: { id } });
  },
};
