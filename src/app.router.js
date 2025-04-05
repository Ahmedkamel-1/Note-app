import  userRouter from "./Modules/User/user.router.js"
import  noteRouter from "./Modules/Note/note.router.js"

export const appRouter = (app,express) => { 
    // Routes
    app.use(express.json())

    // user
    app.use('/user' , userRouter)

    // note
    app.use('/note' , noteRouter)

    // global error handler
    app.use((error,req,res,next) => {
        const statusCode = error.cause || 500 
        return res.status(statusCode).json({
            success:false,
            errorMsg:error.message,
            stack:error.stack
        })
    })

    // not found page
    app.all('*' , (req,res,next) =>{
        return res.status(404).json({success:false , message:"Page not found!"})
    })
}