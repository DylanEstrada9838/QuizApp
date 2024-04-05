import { User } from "../mongomodels/user";
import { hash } from "./security";
import { sign } from "./security";

export const createUser = async (data: Record<string, string>): Promise<string> => {
  data.password = await hash(data.password);
  const user = await User.create(data);
  return sign({ id: user.id });
};

export const findUserByEmail = async (email: Record<string, string>) =>
  await User.findOne(email);

export const findUserById = async (id: string) => await User.findById(id);

export const updateUser = async (id: string, data: Record<string, any>) => {
  if (data.password) {
    data.password = await hash(data.password);
  }
  await User.findByIdAndUpdate(id, data);
};

export const deleteUser = async (id: String): Promise<void> =>
  await User.deleteOne(id);
