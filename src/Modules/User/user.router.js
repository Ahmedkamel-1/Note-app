import { Router } from "express"
import { allUsers, deleteUser, login, profile, signUp } from "./user.controller.js"
import { isAuthenticated } from "../../Middleware/auth.middleware.js"
const router = Router()


// CRUD

// Sign up
router.post('/signup' , signUp)

// Login
router.post('/login' , login)

// delete
router.delete('/', isAuthenticated, deleteUser)

// profile
router.get('/profile' , isAuthenticated , profile)

// all users
router.get('' , isAuthenticated , allUsers)

export default router