import { PrismaClient } from "@prisma/client";
import Hash from "bcrypt";
import jwt from "jsonwebtoken";
import { validContact, upValidContact } from "../middleware/typeValid.js";
// import { use } from "bcrypt/promises.js";
const { sign } = jwt;

export const createContact = async (req, res) => {
  const prisma = new PrismaClient();
  try {
    const body = await req.body;
    // console.log(body)
    const userId = req.userId;
    // console.log(userId);
    const { success } = validContact.safeParse(body);
    //console.log(success);
    if (!success) {
      res.status(400).json({ error: "invalid input!!" });
    }
    //console.log(postBody)
    const contact = await prisma.contact.create({
      data: {
        user: { connect: { id: userId } },
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        address: body.address,
        company: body.company,
        jobTitle: body.jobTitle,
        notes: body.notes,
      },
    });
    // console.log(contact);
    res.status(201).json({ id: contact.id });
  } catch (error) {
    res.status(403).json({
      msg: `Error while creating Contact ${error}`,
    });
  }
};
export const updateContact = async (req, res) => {
  // console.log("starting code..")
  const userId = req.userId;
  // console.log(userId)
  const prisma = new PrismaClient();

  try {
    const body = await req.body;
    console.log(body);
    const { success } = upValidContact.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({ error: "invalid input!!" });
    }
    console.log("before updation..");
    const upContact = await prisma.contact.update({
      where: {
        id: body.id,
        userId: userId,
      },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        address: body.address,
        company: body.company,
        jobTitle: body.jobTitle,
        notes: body.notes,
      },
    });
    console.log("after updation..");
    res.status(200).json(upContact);
  } catch (e) {
    res.status(401).json({
      msg: `error while updating Post Content ${e}`,
    });
  }
};
export const deleteContact = async (req, res) => {
  // console.log("starting code..")
  const userId = req.userId;
  // console.log(userId)
  const prisma = new PrismaClient();

  try {
    const body = await req.body;
    // console.log(body)
    // const { success } = upValidContact.safeParse(body);
    /*if (!success) {
      c.status(400);
      return c.json({ error: "invalid input!!" });
    }*/
    // console.log("before updation..")
    const delContact = await prisma.contact.delete({
      where: {
        id: body.id,
        userId: userId,
      },
    });
    // console.log("after updation..");
    res.status(200).json({ msg: "Contact deleted..." });
  } catch (e) {
    res.status(401).json({
      msg: `error while deleting contact!!!${e}`,
    });
  }
};
export const getById = async (req, res) => {
  const ID = req.params.id;
  // console.log("starting code..")
  const userId = req.userId;
  // console.log(userId)
  const prisma = new PrismaClient();

  try {
    const byIdContact = await prisma.contact.findUnique({
      where: {
        id: ID,
        userId: userId,
      },
    });
    // console.log("after updation..");
    res.status(200).json(byIdContact);
  } catch (e) {
    res.status(401).json({
      msg: `error while deleting contact!!!${e}`,
    });
  }
};
export const getContact = async (req, res) => {
  try {
    // const { page, limit = 10 } = req.query;
    // const skip = (page - 1) * limit;
    const userId = req.userId;
    const prisma = new PrismaClient();

    const userContacts = await prisma.contact.findMany({
      where: {
        userId: userId,
        // skip: skip,
        // take: Number(limit),
      },
    });

    // const totalContacts = await prisma.userContacts.count();
    // const totalPages = Math.ceil(totalContacts/limit)
    res.json(
      userContacts,
      // totalContacts,
      // totalPages

    );
  } catch (e) {
    res.status(404).json({ msg: `Error while fetching contacts ${e}` });
  }
};
