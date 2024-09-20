import express from "express";
import {
  getAllEvents,
     createEvent
  } from "../controllers/evantsControllers.js";
import validId from "../middlewares/isValidId.js";
import authenticate from "../middlewares/authenticate.js";


import validateBody from "../helpers/validateBody.js";
import { createEventSchema, updateEventSchema  } from "../schemas/evantsSchemas.js";

const eventRouter = express.Router();



eventRouter.get("/", getAllEvents);

// contactsRouter.get("/:id", validId, getOneEvent);

// contactsRouter.delete("/:id",validId ,  deleteEvent);

eventRouter.post("/",validateBody(createEventSchema) ,createEvent);

// contactsRouter.put("/:id",validId , validateBody(updateEventSchema),  updateEvent);



export default eventRouter;
