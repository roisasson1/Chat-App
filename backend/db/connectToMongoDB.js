import mongoose from 'mongoose';


// in this file we are trying to connect to Mongo
// with the URI that we got from mongo, saved in .env file
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message)
    }
}

export default connectToMongoDB;