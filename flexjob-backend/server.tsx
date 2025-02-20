import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import jobRoutes from './routes/jobRoutes';


const app: Application = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;

// Middleware
app.use(express.json()); // Replaces body-parser (now built into Express)
app.use(cors());

// MongoDB Connection (Using Async/Await)
const MONGO_URI: string = 'mongodb://localhost:27017/sparetimejobs';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

// Start Server after DB Connection
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});

const app: Application = express();

// Use routes
app.use('/api/auth', authRoutes);


const app: Application = express();

// Use routes
app.use('/api/jobs', jobRoutes);


export default app;



