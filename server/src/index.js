import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import userRouter from "./routes/userRouter.js";
//import { env } from "process";
import contactRouter from "./routes/contactRouter.js";
app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/contact", contactRouter);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

export default app;
