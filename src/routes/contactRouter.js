import  Router from "express";

import { createContact,updateContact,deleteContact,getContact,getById} from "../handlers/contactHandler.js";
import {authValidation} from "../middleware/authMiddleware.js"

const router = Router();

router.use(authValidation)

router.post("/createContact",createContact);
router.put("/updateContact", updateContact)
router.delete("/deleteContact", deleteContact)
router.get("/getContact", getContact)
router.get("/getContact/:id", getById)
    

export default router;


