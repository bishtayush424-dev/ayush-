const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const router = express.Router();

// In-memory storage for OTP (use Redis in production)
const otpStorage = new Map();

// Email configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP Email
async function sendOTPEmail(email, otp) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'StudLink - Email Verification OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">StudLink - NIT Hamirpur</h2>
          <p>Your OTP for email verification is:</p>
          <h1 style="color: #2563eb; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
}

// Send OTP endpoint
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Generate OTP
    const otp = generateOTP();
    const expiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Store OTP
    otpStorage.set(email, { otp, expiry });

    // Send OTP via email
    const emailSent = await sendOTPEmail(email, otp);

    if (!emailSent) {
      return res.status(500).json({ error: 'Failed to send OTP email' });
    }

    res.json({
      success: true,
      message: 'OTP sent successfully',
      email: email
    });

  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Verify OTP and Register
router.post('/verify-register', async (req, res) => {
  try {
    const { email, otp, userData } = req.body;

    if (!email || !otp || !userData) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Verify OTP
    const storedData = otpStorage.get(email);
    if (!storedData) {
      return res.status(400).json({ error: 'OTP not found or expired' });
    }

    if (storedData.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    if (Date.now() > storedData.expiry) {
      otpStorage.delete(email);
      return res.status(400).json({ error: 'OTP has expired' });
    }

    // Validate admin registration
    if (userData.role === 'admin' || userData.role === 'super_admin') {
      if (userData.adminAuthKey !== process.env.ADMIN_AUTH_KEY) {
        return res.status(403).json({ error: 'Invalid admin authorization key' });
      }
    }

    // In a real app, you would save to database here
    // For demo, we'll create a mock user
    const mockUser = {
      id: Date.now().toString(),
      email: email,
      role: userData.role || 'student',
      isCollegeStudent: userData.isCollegeStudent || false,
      rollNo: userData.rollNo,
      year: userData.year,
      branch: userData.branch,
      degree: userData.degree,
      fullName: userData.fullName,
      isVerified: true,
      createdAt: new Date().toISOString()
    };

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: mockUser.id, 
        email: mockUser.email,
        role: mockUser.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Clear OTP
    otpStorage.delete(email);

    res.json({
      success: true,
      message: 'Registration successful',
      user: mockUser,
      token: token
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Mock user validation - in real app, check database
    const mockUser = {
      id: '1',
      email: email,
      role: 'student',
      isCollegeStudent: true,
      fullName: 'Demo User',
      isVerified: true
    };

    // Mock password check - in real app, use bcrypt
    if (password !== 'password') {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { 
        userId: mockUser.id, 
        email: mockUser.email,
        role: mockUser.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      user: mockUser,
      token: token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Verify token endpoint
router.get('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Return mock user data
    const mockUser = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      isCollegeStudent: true,
      fullName: 'Demo User',
      isVerified: true
    };

    res.json({ user: mockUser });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;