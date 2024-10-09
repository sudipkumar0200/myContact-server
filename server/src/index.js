import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import contactRouter from "./routes/contactRouter.js";
import authRouter from "./routes/authRouter.js";
const app = express();
dotenv.config();
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/contact", contactRouter);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

export default app;
