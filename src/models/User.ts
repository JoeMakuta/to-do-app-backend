import { Schema, model } from 'mongoose';
import User from '../types/User';

const userSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: [true, 'Username required'],
      max: [30, 'Only 30 characters are supported'],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      min: [7, 'Password must contains more that 7 characters'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    profileImage: {
      type: String,
      default: 'avatar.png',
      trim: true,
    },
    bio: String,
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model<User>('User', userSchema);
