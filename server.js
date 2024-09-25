const express = require('express');
const cors = require('cors'); // Thêm dòng này
const connectDB = require('./config/database');
const quizRoutes = require('./routes/quizRoutes');
const questionRoutes = require('./routes/questionRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// CORS configuration
const corsOptions = {
  origin: '*', // Cho phép tất cả các origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Cho phép các phương thức HTTP này
  allowedHeaders: ['Content-Type', 'Authorization'] // Cho phép các headers này
};

// Middleware
app.use(cors(corsOptions)); // Thêm middleware CORS
app.use(express.json());

// Routes
app.use('/quizzes', quizRoutes);
app.use('/questions', questionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});