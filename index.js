const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');  // Correct import path
const employeeRoutes = require('./routes/Employee');

const app = express();
app.use(express.json());  // Enable JSON body parsing

const mongoURI = 'mongodb://localhost:27017/comp3123_assignment1';

// MongoDB connection
mongoose.connect('mongodb+srv://101412123:trisha%401601@cluster0.0hugn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// API routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);
try {
    const userRoutes = require('./routes/user');
    console.log('User routes module loaded successfully');
    app.use('/api/v1/user', userRoutes);
  } catch (err) {
    console.error('Error loading userRoutes:', err);
  }
  

// Start server
const PORT = 8084;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});