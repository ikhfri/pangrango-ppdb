export const generatePassword = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateUsername = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};
