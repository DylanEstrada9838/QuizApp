import mongoose, { Schema, Document, model,Types } from "mongoose";


const Grades = mongoose.model("Grades", new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" }, // Reference to User document
    quiz: { type: Schema.Types.ObjectId, ref: "Quiz" }, // Reference to Quiz document
    score: Number,
    // You can include other fields related to the grade if needed
  }));


  
export {Grades};