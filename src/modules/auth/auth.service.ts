import { prisma } from "@/core/config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "@/core/config/env";

export const AuthService = {
  async login(username: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        mustChangePassword: user.mustChangePassword,
      },
      env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    return {
      token,
      mustChangePassword: user.mustChangePassword,
    };
  },

  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new Error("Wrong old password");

    const hashed = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashed,
        mustChangePassword: false,
      },
    });

    return { message: "Password updated successfully" };
  },
};
