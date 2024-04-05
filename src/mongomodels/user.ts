import mongoose, { Schema, Document, model,Types } from "mongoose";


export const User = model(
  "User",
  new Schema(
    {
      email: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
        maxLength: 100,
        validate: {
          validator: function (value: string) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          },
          message: "Invalid email address format",
        },
      },
      username: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 100,
      },
      password: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100,
      },
    },
    { timestamps: true }
  )
);
 declare module "express-serve-static-core"{
  interface Request {
    user:{
      _id:string
    }
  }
 }

