import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSetting } from "./hooks.js";

const eventShema = new Schema(
  {
    event: {
      type: String,
      required:true,
    },
    title: {
      type: String,
      required:true,
    },
    description: {
      type: String,
      required:true,
    },
    date: {
      type: String,
      required:true,
    },
    organizer: {
      type: String,
      required:true,
    },
   
    
  },
  { versionKey: false, timestamps: true }
);
eventShema.post("save", handleSaveError);
eventShema.pre("findOneAndUpdate", setUpdateSetting);
eventShema.post("findOneAndUpdate", handleSaveError);
const Event = model("contact", eventShema);

export default Event;
