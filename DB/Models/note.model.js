import mongoose, { model, Schema, Types } from "mongoose";


const noteSchema = new Schema({
    userid : {
        type: Types.ObjectId,
        ref:"User"
    },
    content:String,
    isCompleted:{
        type:Boolean,
        default:false
    }

} , {timestamps:true})

export const Note = mongoose.models.Note || model("Note" , noteSchema)
