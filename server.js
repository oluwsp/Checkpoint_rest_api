const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

// 1. Load environment variables
dotenv.config({ path: './config/.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// 2. Middleware to parse JSON bodies
app.use(express.json());

// 3. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB.'))
    .catch(err => console.error('Database connection error:', err));

// ==================== ROUTES ====================

// GET : RETURN ALL USERS
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST : ADD A NEW USER TO THE DATABASE
app.post('/users', async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT : EDIT A USER BY ID
app.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } // Returns the modified document rather than the original
        );
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE : REMOVE A USER BY ID
app.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 4. Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});