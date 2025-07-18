import mongoose from "mongoose";
export default async function connectDB() {
  try {
    await mongoose.connect(`${process.env.MONGO_DB_URL!}/KhalalFoods`);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("database now connected");
    });

    connection.on("error", (error) => {
      console.log("database connection error");
      console.log(error);
      process.exit();
    });
  } catch (e) {
    console.log("something went wrong! while connecting db");
    console.log(e);
  }
}
