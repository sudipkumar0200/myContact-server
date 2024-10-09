import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();
const { verify } = jwt;
export const authValidation = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    // console.log(authHeader)
    if (authHeader && authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];
      // token = JSON.stringify(token)
      // console.log(process.env.SECRET_TOKEN);
      // console.log(token);
      //   console.log(process.env.)
      const decoded =await verify(token, process.env.JWT_SECRET);
      //   console.log(decoded)
      // if (req.userId) {
      //   return res.status(201).json({ error: "authenticated" });
      // }
      // console.log("hello from error")
      req.userId = decoded.id;
      // console.log(decoded.id);

      console.log("user authorized..");
      next();
    }
  } catch (err) {
    res.status(500).json({
      error: `Unauthorized ${err}`,
    });
  }
};
