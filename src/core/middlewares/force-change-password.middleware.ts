export const forceChangePassword = (req: any, res: any, next: any) => {
  if (req.user.mustChangePassword) {
    return res.status(403).json({
      message: "You must change password first",
    });
  }
  next();
};
