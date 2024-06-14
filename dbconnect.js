require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGO_URL;


async function connectToDB() {
    try {
        await mongoose.connect(MONGODB_URI, {
            connectTimeoutMS: 30000, // 30 seconds
            socketTimeoutMS: 30000 // 30 seconds
        });
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
}

module.exports = connectToDB;
