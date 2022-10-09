import { Schema, model } from 'mongoose';
import Task from '../types/Task';
import STATUS from './Status';

const taskSchema = new Schema<Task>({
  title: {
    type: String,
    require: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateOfCreation: {
    type: Number,
    required: true,
  },
  dateOfCompletion: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: STATUS,
    default: STATUS.IN_PROGRESS,
  },
});

export default model<Task>('Task', taskSchema);
