import mongoose from "mongoose";

const DBConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected successfully at ${mongoose.connection.host}`);
    } catch (error) {
        console.error('Error in connecting MongoDB Server:', error);
    }
}

export default DBConnection;
