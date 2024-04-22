import { Schema , model } from "mongoose";
import {handleSaveError, setUpdateSetting} from "./hooks.js" 
import{emailRegepxp,subscriptionList} from "../costants/user-constants.js"

const userSchema = new Schema ({
    password: {
        type: String,
        required: [true, 'Password is required'],
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
        default: "starter"
      },
      token: {
        type: String,
        default: null,
      },
      avatarURL:{
        type: String,
      } ,
      verify: {
        type: Boolean,
        default: false,
      },
      verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
      },
       owner: {
       type: Schema.Types.ObjectId,
      ref: 'user',
       },
},{versionKey:false , timestamps:true})

const User=model("users" ,userSchema );

userSchema.post("save",handleSaveError);
userSchema.pre("findOneAndUpdate" , setUpdateSetting)
userSchema.post("findOneAndUpdate",handleSaveError);

export default User