import { prisma } from "@/core/config/prisma";

export const CampaignService = {
  async create(data: any) {
    if (new Date(data.startDate) >= new Date(data.endDate)) {
      throw new Error("startDate must be before endDate");
    }

    return prisma.campaign.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      },
    });
  },

  async findAll() {
    return prisma.campaign.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  async findById(id: string) {
    const campaign = await prisma.campaign.findUnique({
      where: { id },
    });

    if (!campaign) throw new Error("Campaign not found");
    return campaign;
  },

  async update(id: string, data: any) {
    return prisma.campaign.update({
      where: { id },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      },
    });
  },

  async delete(id: string) {
    return prisma.campaign.delete({
      where: { id },
    });
  },
};
