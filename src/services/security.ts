import bcrypt from "bcrypt"
import jwt from  "jsonwebtoken"

export const hash = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const compare = async (password: string, hash: string) =>
  bcrypt.compare(password, hash);

export const sign = (payload: Record<string,any>) =>{
  console.log(payload);
  console.log(process.env.JWT_SECRET);
  
if (!process.env.JWT_SECRET) {
    throw new Error('JWT secret is not defined');
  }
  return jwt.sign(payload, process.env.JWT_SECRET);
}