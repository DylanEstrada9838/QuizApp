import mongoose, { Schema, Document, model, Model, Types } from "mongoose";

interface Option {
  _id: Types.ObjectId;
  option: string;
  isCorrect: boolean;
}

interface Question {
  _id: Types.ObjectId;
  question: string;
  options: Option[];
}

interface Quiz {
  name: string;
  questions?: Question[];
  isPublic: boolean;
  isOpen: boolean;
  category: string;
  user: Types.ObjectId;
}

const optionSchema = new Schema(
  {
    option: { type: String, required: true },
    isCorrect: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: false }
);

const questionSchema = new Schema(
  {
    question: { type: String, required: true },
    options: { type: [optionSchema], required: true }, // Array of options
  },
  { timestamps: true }
);

const quizSchema = new Schema(
  {
    name: { type: String, required: true, minLength: 3, maxLength: 100 },
    questions: [questionSchema], // Array of questions
    isPublic: { type: Boolean, required: true },
    isOpen: { type: Boolean, required: true },
    category: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User document
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);

export { Quiz };
