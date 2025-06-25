import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import User from './model/user.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Request Logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Request Body:', req.body);
    next();
});

// Routes

// Get all users
app.get('/get', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});

// Get user by ID
app.get('/get/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user' });
    }
});

// Create a new user
app.post('/post', async (req, res) => {
    try {
        const { name, email, password, department } = req.body;

        if (!name || !email || !password || !department) {
            return res.status(400).json({
                message: 'All fields are required: name, email, password, department'
            });
        }

        const newUser = new User({ name, email, password, department });
        const savedUser = await newUser.save();

        res.status(201).json({
            message: 'User created successfully',
            user: savedUser
        });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'Email already exists' });
        } else {
            res.status(500).json({
                message: 'Error creating user',
                error: error.message
            });
        }
    }
});

// Update user
app.put('/put/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        res.json({ message: 'User updated', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
});

// Delete user
app.delete('/delete/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
