import mongoose from "mongoose"


export const connectDB = async () =>
    await mongoose
    .connect("mongodb://127.0.0.1:27017/noteapp")
    .then(()=> console.log("DB connected successfully!"))
    .catch((err)=> console.log("DB connection Failed!", err))