import { Router } from "express"
import { allNotes, createNote, deleteNote, updateNote, userNotes } from "./note.controller.js"
import { isAuthenticated } from "../../Middleware/auth.middleware.js"
const router = Router()

// Apis

// create note
router.post('/' , isAuthenticated , createNote)

// update note
router.patch('/:id' ,isAuthenticated , updateNote)

// all notes
router.get('', allNotes)

// user notes
router.get('/user/:id' , userNotes)

// delete note
router.delete('/:id' , deleteNote)
export default router
