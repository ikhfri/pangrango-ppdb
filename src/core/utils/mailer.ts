import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // 587 = false
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendCredentialEmail = async (
  to: string,
  username: string,
  password: string,
) => {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject: "Akun PPDB",
    html: `
      <div style="max-width: 450px; margin: 20px auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; border: 1px solid #e0e4e8; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
  
  <!-- Header Section -->
  <div style="background-color: #2563eb; padding: 24px; text-align: center;">
    <h3 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600; letter-spacing: 0.5px;">
      Akun PPDB Anda
    </h3>
  </div>

  <!-- Body Section -->
  <div style="padding: 30px; background-color: #ffffff;">
    <p style="margin-top: 0; margin-bottom: 20px; color: #64748b; font-size: 14px; text-align: center;">
      Berikut adalah detail kredensial untuk mengakses portal pendaftaran:
    </p>

    <!-- Username Row -->
    <div style="margin-bottom: 12px; padding: 12px 16px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #f1f5f9;">
      <span style="display: block; font-size: 11px; color: #94a3b8; text-transform: uppercase; font-weight: bold; margin-bottom: 4px;">Username</span>
      <strong style="font-size: 16px; color: #1e293b; font-family: 'Courier New', Courier, monospace;">${username}</strong>
    </div>

    <!-- Password Row -->
    <div style="margin-bottom: 20px; padding: 12px 16px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #f1f5f9;">
      <span style="display: block; font-size: 11px; color: #94a3b8; text-transform: uppercase; font-weight: bold; margin-bottom: 4px;">Password</span>
      <strong style="font-size: 16px; color: #1e293b; font-family: 'Courier New', Courier, monospace;">${password}</strong>
    </div>

    <!-- CTA / Button (Optional) -->
    <div style="text-align: center; margin-top: 25px;">
      <a href="#" style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; display: inline-block;">
        Login ke Portal
      </a>
    </div>
  </div>

  <!-- Footer/Warning Section -->
  <div style="background-color: #fffbeb; padding: 16px 24px; border-top: 1px solid #fef3c7; text-align: center;">
    <p style="margin: 0; font-size: 13px; color: #92400e; line-height: 1.5;">
      ⚠️ <strong>Penting:</strong> Demi keamanan, silakan login dan segera ganti password Anda setelah masuk ke sistem.
    </p>
  </div>
</div>
    `,
  });
};
