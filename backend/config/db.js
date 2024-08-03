import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://anituberhim:anituberhim@cluster0.grrctzv.mongodb.net/food-del').then(()=>console.log('DB Connected'));
}