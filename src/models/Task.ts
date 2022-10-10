import { Schema, model } from 'mongoose';
import Task from '../types/Task';

enum STATUS {
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
}

const taskSchema = new Schema<Task>({
  title: {
    type: String,
    require: true,
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
