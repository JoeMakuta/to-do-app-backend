import STATUS from '../models/Status';

interface Task {
  title: string;
  description: string;
  dateOfCreation: number;
  dateOfCompletion: Date;
  status: STATUS;
}

export default Task;
