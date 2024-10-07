import  Router from "express";

//import { signUpInput, signInInput } from "@tech0200/typevalid";
import { createContact,updateContact,deleteContact,getContact,getById} from "../handlers/contactHandler.js";
import {authValidation} from "../middleware/tokenValid.js"

const router = Router();

router.use(authValidation)

router.post("/createContact",createContact);
router.put("/updateContact", updateContact)
router.delete("/deleteContact", deleteContact)
router.get("/getContact", getContact)
router.get("/getContact/:id", getById)
    

export default router;


/*import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { validContact } from "../middlewares/validiation";
//import { blogInput } from "@tech0200/typevalid";

const contactRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

contactRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  //const token = authHeader.split("")[1]
  //console.log("hello before verify");
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    //console.log(user);
    //console.log(`userID after verify ${user.userId}`)
    c.set("userId", String(user.userId));
    await next();
    // console.log("after next");
  } catch (e) {
    c.status(403);
    c.json({
      msg: `Unauthorization ${e}`,
    });
  }
});

contactRouter.post("/createBlog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const authorId = c.get("userId");
  try {
    const postBody = await c.req.json();
    //console.log(createBlogInput)
    console.log(postBody)
    const { success } = validContact.safeParse(postBody);
    console.log(success)
    if (!success) {
      c.status(400);
      return c.json({ error: "invalid input!!" });
    }
    //console.log(postBody)
    const blog = await prisma.post.create({
      data: {
        title: postBody.title,
        content: postBody.content,
        authorId: authorId,
      },
    });
    console.log(blog);
    c.status(201);
    return c.json({ id: blog.id });
  } catch (error) {
    c.status(403);
    c.json({
      msg: `Error while creating blog Post!! ${error}`,
    });
  }
});

contactRouter.put("/updateBlog", async (c) => {
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const postBody = await c.req.json();
    const { success } = validContact.safeParse(postBody);
    if (!success) {
      c.status(400);
      return c.json({ error: "invalid input!!" });
    }
    const post = await prisma.post.update({
      where: {
        id: postBody.id,
        authorId: authorId,
      },
      data: {
        title: postBody.title,
        content: postBody.content,
      },
    });
    c.status(200);
    return c.json({ post });
  } catch (e) {
    c.status(401);
    return c.json({
      msg: `error while updating Post Content ${e}`,
    });
  }
});

contactRouter.get("/blog/:id", async (c) => {
  const id = await c.req.param("id");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    return c.json({ blog });
  } catch (e) {
    c.status(411);
    return c.json({
      msg: `unable to fing blog post!!!!`,
    });
  }
});

contactRouter.get("/blogs", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const posts = await prisma.post.findMany();

    return c.json({ posts });
  } catch (e) {
    c.status(411);
    return c.json({
      msg: `unable to find blogs!!!!! ${e}`,
    });
  }
});

export default contactRouter;*/