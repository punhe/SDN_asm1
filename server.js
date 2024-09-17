const express = require('express');
const connectDB = require('./config/database');
const quizRoutes = require('./routes/quizRoutes');
const questionRoutes = require('./routes/questionRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/quizzes', quizRoutes);
app.use('/questions', questionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});