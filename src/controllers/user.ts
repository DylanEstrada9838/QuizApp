import AuthException from "../exceptions/authentication";
import {
  createUser,
  updateUser,
  findUserByEmail,
  deleteUser,
  findUserById
} from "../services/user";
import { authenticate } from "../services/authentication";
import { Response, Request } from "express";
import { handleError} from "../exceptions/handleError";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const userEmail = await findUserByEmail({ email });
  if (userEmail) {
    handleError(res, 400, "ERR_USER", "User with email already created", "");
  } else {
    try {
      const token = await createUser({ email, username, password });
      res.status(201).json({ token });
    } catch (error) {
      handleError(res, 400, "ERR_USER", "User cannot be created", error);
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(req.body);
  
  try {
    const token = await authenticate({ email, password });
    console.log(token);
    
    res.status(201).json({
      token,
    });
  } catch (error) {
    if (error instanceof AuthException) {
      handleError(res, 403, "ERR_AUTH", "Email or password is invalid", error);
    }
  }
};

export const changeUser = async (req: Request, res: Response) => {
  const { _id } = req.user;
  const { username, password } = req.body;

  try {
    await updateUser(_id, { username, password });
    res.status(204).end();
  } catch (error) {
    handleError(res, 500, "ERR_USER", "User could not be updated", error);
  }
};

export const removeUser = async (req: Request, res: Response) => {
  const { _id } = req.user;
  try {
    await deleteUser(_id);
    res.status(204).end();
  } catch (error) {
    handleError(res, 500, "ERR_USER", "User could not be deleted", error);
  }
};
