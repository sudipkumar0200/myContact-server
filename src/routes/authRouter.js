import  Router from "express";
import dotenv from "dotenv";
dotenv.config();
//import { signUpInput, signInInput } from "@tech0200/typevalid";
import { registerUser, loginUser,logoutUser } from "../handlers/authHandler.js";

const router = Router();

router.post("/register",registerUser);
router.post("/login", loginUser)
router.post("/logout", logoutUser)
    

export default router;