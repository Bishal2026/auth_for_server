import dotenv from "dotenv";
import connectDB from "./db/database.db.js";
import app from "./app.js";

dotenv.config({
  path: "./src/.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 9000, () => {
      console.log(`server is running at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MOngoDB COnnection Faild!!", err);
  });
