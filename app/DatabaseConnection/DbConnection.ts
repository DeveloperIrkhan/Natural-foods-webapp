import mongoose from "mongoose";
//mongodb+srv://devirfankhanpk:E9wGdjlDHgyELTm4@cluster0.50gzj.mongodb.net/KhalalFoods
export default async function connectDB() {
  try {
    await mongoose.connect(
      `mongodb+srv://devirfankhanpk:E9wGdjlDHgyELTm4@cluster0.50gzj.mongodb.net/KhalalFoods`
    );
    console.log("database connected");
  } catch (e) {
    console.log(e);
  }
}
