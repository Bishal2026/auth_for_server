import express from "express";
import cookieparser from "cookie-parser";
import UserRouter from "./routers/user.routers.js";

const app = express();

app.use(cookieparser());
app.use(express.json());

app.use("/api/v1/user", UserRouter);

export default app;
