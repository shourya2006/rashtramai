const express = require('express');
const authRouter = require('./auth/route');
const connectDB = require('./db');
const cors = require('cors');
const { generalLimiter, authLimiter, helmetConfig } = require('./middleware/security');
require('dotenv').config();
const passport = require('./passport.js');
const app = express();
const port = process.env.PORT || 5001;


app.use(helmetConfig);


app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

connectDB();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));


app.use(generalLimiter);


app.use('/api/auth', authLimiter, authRouter);


app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});