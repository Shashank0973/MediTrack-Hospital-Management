import mongoose from 'mongoose';

export const connectDB = async () => {
  await mongoose.connect("mongodb+srv://engineer501501_db_user:H7ATRSCShuy4CqiP@cluster0.qkhdbgm.mongodb.net/MEDITRACK")
  .then(() => {
    console.log("DB CONNECTED")
  })
}
