import { PrismaClient } from "@prisma/client";

export const createTag = async (req, res) => {
  try {
    const prisma = new PrismaClient();
    const tagName = await req.body;
    const tag = await prisma.tags.create({
      data: {
        name: tagName.name,
      },
    });

    // console.log(contact);
    res
      .status(201)
      .json(`tag created with tagName = ${tag.name}, and tagId ${tag.id}`);
  } catch (error) {
    res.status(403).json(`Error while creating tags${error}`);
  }
};

export const addTagToContact = async (req, res) => {
  try {
    const prisma = new PrismaClient();

    const { tagId, contactId } = req.params;

    //console.log(tagId, contactId);
    if (!tagId && !contactId) {
      res
        .status(405)
        .json(`Either tagId or contactId not provided correctly!!!`);
    }
    const tagedContact = await prisma.contact.update({
      where: {
        id: contactId,
      },
      data: {
        tags: {
          connect: { id: Number(tagId) },
        },
      },
    });

    res.send(tagedContact);
  } catch (error) {
    res.status(404).json(`Error while adding tags in contacts ${error}`);
  }
};
export const contactByTag = async (req, res) => {
  try {
    const prisma = new PrismaClient();

    const tagId = req.params;
    console.log(tagId)

    const getContactByTag = await prisma.contact.findMany({
      where: {
        tags:{
          some:{id:parseInt(tagId.tagId)}
        }
      }
    });

    res.send(getContactByTag);
  } catch (error) {
    res.status(404).json(`Error while fetching contacts by tag ${error}`);
  }
};
