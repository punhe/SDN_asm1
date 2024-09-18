const mongoose = require('mongoose');
require('dotenv').config();

// Đặt strictQuery ở đây, bên ngoài hàm connectDB
mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in the environment variables');
    }
    console.log('Attempting to connect with URI:', uri);
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;