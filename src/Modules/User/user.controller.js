import { User } from "../../../DB/Models/user.model.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { catchError } from '../../utils/catchError.js'

// sign up
export const signUp = catchError (async (req,res,next)=> {
            // data
            const {name,email,password, confirmPassword} = req.body
            if (password !== confirmPassword){
                // return res.json({success:false , message :"Password must match!"})
                return next(new Error('Password muct match!',{cause:400}))
            }
            // check email
            const isUser = await User.findOne({email})
            if(isUser) {
                //return res.json({success:false , message:"Emai must be unique!"})
                return next(new Error('Email must be unique!'))
            }
            // create
            const hashedPassword = bcryptjs.hashSync(password , parseInt(process.env.SALTROUNDS))
            const user = await User.create({name,email,password: hashedPassword})
            // response
            return res.json({success:true , message :"User created successfully!" , user})
})

// login
export const login = catchError (async(req,res,next)=>{
        // data
    const {email , password} = req.body
    // query 
    // check email
    const user = await User.findOne({email})
    if(!user) {
        // return res.json({success:false , message :"invalid Email!"})
        return next(new Error('invalid Email!'))
    }
    //check password
    const match =  bcryptjs.compareSync(password , user.password)
    if(match) {
        // return res.json({success:false , message :"invalid Password!"})
        return next(new Error('invalid Password!'))
    }
    const token = jwt.sign({email:user.email , id:user._id} , process.env.TOKENKEY)
    return res.json({success:true , token})
})

// profile
export const profile = catchError (async(req,res,next) =>{
        // token
        const { token } = req.headers
        if(!token) {
        // return res.json({success:false , message:"Please login!"})
        return next(new Error('Please login first!'))
        }
        // decode
        const payload = jwt.verify(token , process.env.TOKENKEY)
        const { id } = payload
        const user = await User.findById(id)
        return res.json({success:true , results:user})
})

// delete
export const deleteUser = catchError (async(req,res,nex) => {
        const  email  = req.user.email
        // query
        const user = await User.findOneAndDelete({email})
        if(!user) {
            // return res.json({success:false , message:"User not found!"})
            return next(new Error('User not found!'))
        }
        return res.json({success:true , message:"Account deactivated successfully!"})
})

// all users
export const allUsers = catchError (async(req,res,next) => {
        // query
        const user = await User.find()
        return res.json({success:true , results:user})
})