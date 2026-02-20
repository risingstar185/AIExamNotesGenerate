import express from 'express'
import { generateNotesController } from '../controllers/generate.controller.js';
import isAuth from '../middleware/isAuth.js';
import { getMyNotes, getSingleNote,deleteNote } from '../controllers/notes.controller.js';

const geminiRouter=express.Router();  

geminiRouter.post('/generate',isAuth,generateNotesController)
geminiRouter.get('/getnotes',isAuth,getMyNotes)
geminiRouter.get('/note/:id', isAuth, getSingleNote)

geminiRouter.delete("/note/:id", isAuth, deleteNote);


export default geminiRouter;
