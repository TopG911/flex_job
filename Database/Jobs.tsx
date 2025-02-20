import mongoose, { Document, Schema, Model } from 'mongoose';

// Define the TypeScript interface for the Job document
interface IJob extends Document {
  title: string;
  description: string;
  location: string;
  postedBy: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

// Define the Job Schema
const JobSchema: Schema<IJob> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  postedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create and export the Mongoose Model
const Job: Model<IJob> = mongoose.model<IJob>('Job', JobSchema);
export default Job;
