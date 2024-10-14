import  Router from "express";

import {createTag,addTagToContact,contactByTag} from "../handlers/contactTagHandler.js";
import {authValidation} from "../middleware/authMiddleware.js"

const router = Router();

router.use(authValidation)

router.post("/createTag",createTag);
router.post("/addTag/:tagId/:contactId", addTagToContact)
router.get("/tagedContacts/:tagId", contactByTag)
    

export default router;


