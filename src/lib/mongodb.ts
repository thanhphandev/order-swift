import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string ?? "mongodb://localhost:27017/qr-swiftfood");
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
};

export default connectDB;
