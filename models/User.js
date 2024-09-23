import { Schema , model } from "mongoose";
import {handleSaveError, setUpdateSetting} from "./hooks.js" 
import{emailRegepxp,subscriptionList} from "../costants/user-constants.js"

const userSchema = new Schema ({
  event: {
    type: String,
    required:true,
  },
      name: {
        type: String,
        required: [true, 'Name is required'],
      },
      birthday: {
        type: String,
        required: [true, 'Date is required'],
      },
      email: {
        type: String,
        match:emailRegepxp,
        required: [true, 'Email is required'],
        unique: false,
      },
      subscription: {
        type: String,
        enum: subscriptionList,
      },
      
},{versionKey:false , timestamps:true})
userSchema.index({ event: 1, email: 1 }, { unique: true });
const User=model("users" ,userSchema );





export default User