import { PrismaClient } from "@prisma/client";
import Hash from "bcrypt";
import jwt from "jsonwebtoken";
import { validInput } from "../middleware/typeValid.js";
const { sign } = jwt;

export const registerUser = async (req, res) => {
  const prisma = new PrismaClient();

  try {
    const body = await req.body;
    const success = validInput.safeParse(body);
    // console.log("validation pass..");
    if (!success) {
      res.status(400).json({ errer: "invalid input!!!!" });
    }

    const isUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    // console.log("email investigation passed..");
    if (isUser) {
      res.status(401).json({ error: "user already exist!!!" });
    }
    const hashPass = await Hash.hash(body.password, 10);
    // console.log("password hashing pass...");
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashPass,
      },
    });
    //  console.log(hashPass)
    res.status(201).send(user);
  } catch (e) {
    res.status(401).json({
      msg: `error while Regesteration , please try again ${e}`,
    });
  }
};

export const loginUser = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const body = await req.body;

    const { success } = validInput.safeParse(body);
    if (!success) {
      res.status(400).json({ errer: "invalid input!!!!" });
    }

    const isUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    const pswdVerify = await Hash.compare(body.password, isUser.password);
    // console.log(body.password);
    // console.log(isUser.password);

    // console.log(pswdVerify);

    if (isUser && pswdVerify) {
      console.log("both pass and user verified");
      const loginToken = await sign(
        {
          id: isUser.id,
          email: isUser.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.cookie("token", loginToken)
      .json({msg :"User logined ..."})
    } else {
      res.json({ msg: `Either email or password is incorrect!!!` });
    }
  } catch (error) {
    res.status(401).json({ msg: `login process failed ${error}` });
  }
};

export const logoutUser = async (req,res) =>{
  res.clearCookie("token").json({msg:"User logout"})
}
