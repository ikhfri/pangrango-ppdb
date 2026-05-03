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
      <h3>Akun PPDB Anda</h3>
      <p><b>Username:</b> ${username}</p>
      <p><b>Password:</b> ${password}</p>
      <p>Silakan login dan segera ganti password Anda.</p>
    `,
  });
};
