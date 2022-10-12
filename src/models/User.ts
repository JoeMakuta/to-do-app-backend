import { Schema, model } from 'mongoose';
import User from '../types/User';
import * as express from 'express';
import * as bcrypt from 'bcrypt';

const userSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      max: 30,
      trim: true,
    },
    email: {
      type: String,
      required: true,
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
      min: 7,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next: express.NextFunction) {
  if (!this.isModified('password')) next();

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
  next();
});

export default model<User>('User', userSchema);
