import { prisma } from "@/core/config/prisma";
import { snap } from "./payment.midtrans";

export const PaymentService = {
  async createSnapToken(registrationId: string) {
    const payment = await prisma.payment.findFirst({
      where: { registrationId, status: "PENDING" },
      include: { registration: true },
    });

    if (!payment) throw new Error("Payment not found");

    const orderId = `ORDER-${payment.id}-${Date.now()}`;

    await prisma.payment.update({
      where: { id: payment.id },
      data: { externalId: orderId },
    });

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: payment.amount,
      },
      customer_details: {
        first_name: payment.registration.namaLengkap,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    return {
      token: transaction.token,
      redirectUrl: transaction.redirect_url,
    };
  },

  async handleWebhook(body: any) {
    const { order_id, transaction_status, payment_type } = body;

    const payment = await prisma.payment.findFirst({
      where: { externalId: order_id },
    });

    if (!payment) throw new Error("Payment not found");

    let status: any = "PENDING";

    if (transaction_status === "settlement") status = "PAID";
    if (transaction_status === "capture") status = "PAID";
    if (transaction_status === "expire") status = "EXPIRED";
    if (transaction_status === "cancel") status = "FAILED";

    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status,
        paymentMethod: payment_type,
        paidAt: status === "PAID" ? new Date() : null,
      },
    });

    if (status === "PAID") {
      await prisma.registration.update({
        where: { id: payment.registrationId },
        data: { status: "VERIFIED" },
      });
    }

    return true;
  },
};
