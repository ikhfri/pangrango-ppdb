import { prisma } from "@/core/config/prisma";

export const DocumentService = {
  async upload(
    registrationId: string,
    documentTypeId: string,
    file: Express.Multer.File,
  ) {
    if (!file) throw new Error("File is required");

    return prisma.document.create({
      data: {
        fileUrl: file.path,
        registrationId,
        documentTypeId,
      },
    });
  },

  async findByRegistration(registrationId: string) {
    return prisma.document.findMany({
      where: { registrationId },
      include: {
        documentType: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async review(id: string, status: "APPROVED" | "REJECTED", note?: string) {
    if (status === "REJECTED" && !note) {
      throw new Error("Note is required when rejecting document");
    }

    return prisma.document.update({
      where: { id },
      data: {
        status,
        note,
      },
    });
  },
};
