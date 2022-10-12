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
  },
  dateOfCreation: {
    type: Date,
    default: Date.now(),
  },
  dateOfCompletion: {
    type: Date,
  },
  status: {
    type: String,
    enum: STATUS,
    default: STATUS.IN_PROGRESS,
  },
});

export default model<Task>('Task', taskSchema);
