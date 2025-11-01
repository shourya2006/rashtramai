const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const SecretKey = process.env.JWT_SECRET || "IssueWithJWTSecretKey";

const googleLoginController = async (req, res) => {
    try{
    const data = {
      user: {
        id: req.user._id,
      },
    };
    
    const token = jwt.sign(data, SecretKey, { 
      expiresIn: '24h',
      issuer: 'rashtram-ai',
      audience: 'rashtram-ai-client'
    });
    // res.status(200).json({ 
    //   token,
    //   user: {
    //     id: req.user._id,
    //     name: req.user.name,
    //     email: req.user.email
    //   }
    // });
    res.redirect('http://localhost:3000/app?token='+token);
    }catch(error){
        console.error('Google Login error:', error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
module.exports = { googleLoginController };