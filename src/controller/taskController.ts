import * as express from 'express';
import ITask from '../types/Task';
import Task from '../models/Task';
import httpStatusCode from 'http-status-codes';
import * as createError from 'http-errors';
import { createTaskSchema } from '../helpers/schemaValidation';
import * as mongoose from 'mongoose';

export const createTask = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  try {
    const result: ITask = await createTaskSchema.validateAsync(req.body);

    const newTask = new Task({ ...result });

    const savedTask = await newTask.save();

    res.status(httpStatusCode.OK).json({
      message: 'Created successful',
      data: savedTask,
      success: true,
      error: null,
    });
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

export const updateTask = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  const id = req.params.id;
  const task: ITask = req.body;

  if (mongoose.isValidObjectId(id)) {
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        {
          title: task.title,
          description: task.description,
          dateOfCreation: task.dateOfCreation,
          dateOfCompletion: task.dateOfCompletion,
          status: task.status,
        },
        {
          new: true,
        },
      ).catch((error) => next(error));

      if (updatedTask) {
        res.status(httpStatusCode.OK).json({
          message: 'Updated successful',
          data: updatedTask,
          success: true,
          error: null,
        });
      } else {
        throw new createError.NotFound('Task not found');
      }
    } catch (error) {
      next(error);
    }
  } else {
    next(new createError.BadRequest('Invalid ID'));
  }
};

export const deleteTask = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  const id = req.params.id;
  if (mongoose.isValidObjectId(id)) {
    try {
      const deletedTask = await Task.findByIdAndDelete(id).catch((error) =>
        next(error),
      );

      if (deletedTask) {
        res.status(httpStatusCode.OK).json({
          message: '  Deleted successful',
          data: deletedTask,
          success: true,
          error: null,
        });
      } else {
        throw new createError.NotFound('Task not found');
      }
    } catch (error) {
      next(error);
    }
  } else {
    next(new createError.BadRequest('Invalid ID'));
  }
};
