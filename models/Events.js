import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSetting } from "./hooks.js";

const eventShema = new Schema(
  {
    title: {
      type: String,
      required:true,
    },
    description: {
      type: String,
      required:true,
    },
    date: {
      type: Number,
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
