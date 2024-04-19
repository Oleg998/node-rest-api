import express from "express";
import {
  getAllContacts,
   getOneContact,
  deleteContact,
  createContact,
  updateContact,
  getOneFavoriteContact , 
} from "../controllers/contactsControllers.js";
import validId from "../middlewares/isValidId.js";
import authenticate from "../middlewares/authenticate.js";


import validateBody from "../helpers/validateBody.js";
import { createContactSchema, updateContactSchema ,updateFavoriteSchema } from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", validId, getOneContact);

contactsRouter.delete("/:id",validId ,  deleteContact);

 contactsRouter.post("/",validateBody(createContactSchema) ,createContact);

contactsRouter.put("/:id",validId , validateBody(updateContactSchema),  updateContact);

contactsRouter.patch("/:id/favorite", validId, validateBody(updateFavoriteSchema), getOneFavoriteContact);

export default contactsRouter;
