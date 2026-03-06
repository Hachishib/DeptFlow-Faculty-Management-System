import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { verifyGoogleToken } from './GoogleAuth.js'; 

dotenv.config();

const app = express();
const PORT = 3000;

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5176'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

// --- ADD THIS HERE FOR TESTING ---
app.get('/api/auth/login', (req, res) => {
  res.send("Backend is reached! The GET route is working. Use POST for actual login.");
});
// ---------------------------------

app.post('/api/auth/login', verifyGoogleToken);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});