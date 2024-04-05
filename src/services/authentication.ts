import { findUserByEmail } from "./user";
import { compare, sign } from "./security";
import AuthException from "../exceptions/authentication";

export const authenticate = async (credentials: Record<string, string>): Promise<string> => {
  const { email, password } = credentials;
  const user = await findUserByEmail({ email });

  if (!user) {
    throw new AuthException();
  }
  
  const isPasswordValid = await compare(password, user.password);
  console.log(isPasswordValid);
  
  if (!isPasswordValid) {
    throw new AuthException();
  }

  return sign({ _id: user._id });
};
