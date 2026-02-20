import express from 'express';
import { pdfDownload } from '../controllers/pdfController.js';
import isAuth from '../middleware/isAuth.js';

const Pdfrouter = express.Router();

// Example route for PDF generation
Pdfrouter.post('/generate-pdf',isAuth,pdfDownload);

export default Pdfrouter;
