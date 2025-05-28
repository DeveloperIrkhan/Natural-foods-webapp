import bcrypt from "bcrypt";

export const hashingPassword = async (password: string) => {
  try {
    const saltrounds = 10;
    const hashedpassword = await bcrypt.hash(password, saltrounds);
    return hashedpassword;
  } catch (error) {
    console.log("error while hashing password", error);
  }
};
  
