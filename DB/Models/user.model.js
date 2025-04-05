import mongoose, { model, Schema, Types } from "mongoose";

const userSchema = new Schema({
    name: {
        type:String,
        allowNull:false
    },
    password: String,
    email: {
        type:String,
        unique:true
    },
    notes: [
        {
            type:Types.ObjectId,
            ref: "Note"
        }
    ]
} , {timestamps:true})

export const User = mongoose.models.User  || model("User" , userSchema)
