import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from './models/User.js'; // adjust path if needed

dotenv.config();

const run = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: 'secureCodingDB',
    });

    const hash = await bcrypt.hash('newSecurePassword123', 10);

    await User.updateOne(
        { email: 'kalpana@example.com' },
        {
            $set: {
                name: 'Kalpana Panchal',
                password: hash
            }
        }
    );

    console.log('✅ Test user inserted');
    mongoose.disconnect();
};

run();