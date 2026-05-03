import { prisma } from "@/core/config/prisma";

export const AdminService = {
  // 🔹 SUMMARY STATS
  async getSummary() {
    const [
      totalRegistration,
      verified,
      pending,
      rejected,
      totalPayment,
      paidPayment,
    ] = await Promise.all([
      prisma.registration.count(),
      prisma.registration.count({ where: { status: "VERIFIED" } }),
      prisma.registration.count({ where: { status: "PENDING" } }),
      prisma.registration.count({ where: { status: "REJECTED" } }),
      prisma.payment.count(),
      prisma.payment.count({ where: { status: "PAID" } }),
    ]);

    return {
      registration: {
        total: totalRegistration,
        verified,
        pending,
        rejected,
      },
      payment: {
        total: totalPayment,
        paid: paidPayment,
      },
    };
  },

  // 🔹 REGISTRATION LIST (FILTER + SEARCH)
  async getRegistrations(query: any) {
    const { status, campaignId, search } = query;

    return prisma.registration.findMany({
      where: {
        status: status || undefined,
        campaignId: campaignId || undefined,
        namaLengkap: search
          ? {
              contains: search,
              mode: "insensitive",
            }
          : undefined,
      },
      include: {
        campaign: true,
        payments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  // 🔹 DETAIL REGISTRATION (FULL DATA)
  async getRegistrationDetail(id: string) {
    return prisma.registration.findUnique({
      where: { id },
      include: {
        campaign: true,
        address: true,
        parent: true,
        documents: {
          include: { documentType: true },
        },
        payments: true,
        scores: {
          include: { subject: true },
        },
      },
    });
  },

  // 🔹 DOCUMENT STATS
  async getDocumentStats() {
    const [pending, approved, rejected] = await Promise.all([
      prisma.document.count({ where: { status: "PENDING" } }),
      prisma.document.count({ where: { status: "APPROVED" } }),
      prisma.document.count({ where: { status: "REJECTED" } }),
    ]);

    return { pending, approved, rejected };
  },

  // 🔹 PAYMENT STATS
  async getPaymentStats() {
    const [pending, paid, failed, expired] = await Promise.all([
      prisma.payment.count({ where: { status: "PENDING" } }),
      prisma.payment.count({ where: { status: "PAID" } }),
      prisma.payment.count({ where: { status: "FAILED" } }),
      prisma.payment.count({ where: { status: "EXPIRED" } }),
    ]);

    return { pending, paid, failed, expired };
  },
};
