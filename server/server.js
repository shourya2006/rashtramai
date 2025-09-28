const express = require('express');
const authRouter = require('./auth/route');
const connectDB = require('./db');
const cors = require('cors');
const { generalLimiter, authLimiter, helmetConfig } = require('./middleware/security');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

// Security middleware
app.use(helmetConfig);

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

connectDB();

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting middleware
app.use(generalLimiter); // Apply general rate limiting to all requests

// Routes with specific security measures
app.use('/api/auth', authLimiter, authRouter); // Apply stricter rate limiting to auth routes

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});