import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const instancesConnction = await mongoose.connect(
      `${process.env.MOGODB_URL}`
    );
    console.log(`DB connect!! ${instancesConnction.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
