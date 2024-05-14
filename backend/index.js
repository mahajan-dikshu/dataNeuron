// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors package
const componentRoutes = require('./routes/component');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors()); // Use cors middleware to handle CORS errors

// Database connection
mongoose.connect('mongodb+srv://dikshitamahajan0410:hSzsX9VWhL6tucQk@books.qxsg7gc.mongodb.net/?retryWrites=true&w=majority&appName=Books', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/components', componentRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
