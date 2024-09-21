import { Schema , model } from "mongoose";
import {handleSaveError, setUpdateSetting} from "./hooks.js" 
import{emailRegepxp,subscriptionList} from "../costants/user-constants.js"

const userSchema = new Schema ({
      name: {
        type: String,
        required: [true, 'Name is required'],
      },
      date: {
        type: String,
        required: [true, 'Date is required'],
      },
      email: {
        type: String,
        match:emailRegepxp,
        required: [true, 'Email is required'],
        unique: true,
      },
      subscription: {
        type: String,
        enum: subscriptionList,
      },
      
},{versionKey:false , timestamps:true})

const User=model("users" ,userSchema );

userSchema.post("save",handleSaveError);
userSchema.pre("findOneAndUpdate" , setUpdateSetting)
userSchema.post("findOneAndUpdate",handleSaveError);

export default User