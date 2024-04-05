import mongoose from "mongoose";
import {User} from "./mongomodels/user"
import {Quiz} from "./mongomodels/quiz" 




async function deleteAllUsers() {
    try {
      // Delete all documents from the collection
      const result = await User.deleteMany({});
  
      console.log(`${result.deletedCount} documents deleted from the collection.`);
    } catch (error) {
      console.error('Error deleting documents:', error);
    } finally {
      // Close the connection
      mongoose.disconnect();
    }
  }
  async function deleteAllQuizzes() {
    try {
      // Delete all documents from the collection
      const result = await Quiz.deleteMany({});
  
      console.log(`${result.deletedCount} documents deleted from the collection.`);
    } catch (error) {
      console.error('Error deleting documents:', error);
    } finally {
      // Close the connection
      mongoose.disconnect();
    }
  }

const connectMongo = async () => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.7vrw2nf.mongodb.net/QuizApp?retryWrites=true&w=majority&appName=Cluster0`,
     )
    .then(() => console.log("> Connection to MongoDB has been established"))
    // .then(()=> deleteAllQuizzes())
    // .then(()=>deleteAllUsers())
    .catch((e) => console.error("> Error:", e));
    
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
};

export {connectMongo};
