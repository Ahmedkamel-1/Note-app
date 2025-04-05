import { Note } from "../../../DB/Models/note.model.js"
import { User } from "../../../DB/Models/user.model.js"
import { catchError } from '../../utils/catchError.js'



// create
export const createNote = catchError (async(req,res,next) => {
    // data
    const { content } = req.body
    const userid = req.user._id
    // check user
    const user = await User.findById(userid)
    if(!user) {
        return res.json({success:false, message:"User not found!"})
    }
    // query
    const note = await Note.create({content , userid})
    return res.json({success:true , results:note})
})

// update
export const updateNote =  catchError (async(req,res,next)=> {
    // data
    const { id } = req.params // note id
    const { isCompleted  } = req.body
    const userid = req.user._id
    // check user
    const user = await User.findById(userid)
    if(!user) {
        return res.json({success:false,message:"User not found!"})
    }

    const note = await Note.findOneAndUpdate({_id:id , userid} , {isCompleted} , {new:true})
    if(!note) {
        return res.json({success:false , message:"Note not Found!"})
    }
    return res.json({success:true , results:note})
    // query
    
})

// all notes
export const allNotes = catchError (async (req,res,next)=> {

        // query
    const note = await Note.find({} , {content:1 , _id:0  }).populate({
        path:"userid",
        select:"name email -_id"
    })
    return res.json({success:true , results:note})
})

// user notes
export const userNotes = catchError (async (req,res,next) =>{
        // data
    const { id } = req.params
    // query
    const results = await Note.find({userid:id})
    return res.json({success:true , results})
})

// delete note
export const deleteNote = catchError (async (req,res,next) =>{
        // data
    const { id } = req.params
    const note = await Note.findByIdAndDelete(id , {new:true})
    return res.json({success:true , message:"Note deleted successfully"})
})