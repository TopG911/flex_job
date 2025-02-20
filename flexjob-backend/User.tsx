import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the TypeScript interface for the User document
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  skills?: string[];
  availability?: string;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define the User Schema
const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skills: { type: [String], default: [] },
  availability: { type: String, default: 'Available' },
  createdAt: { type: Date, default: Date.now },
});

// **Pre-save middleware** → Hash password before saving
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error as Error);
  }
});

// **Method to compare passwords** (for login authentication)
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create and export the Mongoose Model
const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
export default User;
