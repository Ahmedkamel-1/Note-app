import jwt from "jsonwebtoken"
import { User } from "../../DB/Models/user.model.js"
import { catchError } from "../utils/catchError.js"

export const isAuthenticated = catchError(async (req,res,next) => {
            // token
    let { token } = req.headers

    if(!token) {
        return res.status(400).json({success:false , message:"Token is required!"})
    }

    if(!token.startsWith(process.env.BEARERKEY)) {
        return res.status(401).json({success:false , message :"invalid token!"})
    }

    // reassign token
    token = token.split(process.env.BEARERKEY)[1]

    // decoded
    const payload = jwt.verify(token , process.env.TOKENKEY)

    // check user existence
    const user = await User.findById(payload.id).select('email')
    if(!user) {
        return res.json({success:false , message:"User not found!"})
    }
    req.user = user
    return next()
})
