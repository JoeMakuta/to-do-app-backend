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
          message: 'Deleted successful',
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

export const getTasks = async (req , res) => {
  try {
      const task = await Task.findOne(req.body);
      const data = task;
      res.status(200).json({Task:data}).sort({
        dateOfCreation: 'desc'
    });
  } catch (error) {
      res.status(500).send("err");
  }
}

export const fetchTask = async (req , res) => {
  const perPage = 10;
  var page = req.params.page;
  Task.find((err, tasks) => {
      if (err) {
          res.status(500).json({
              error: err.message
          });
      } else {
              res.status(200).json({
                  task: tasks
              }); 
      }
  }).limit(perPage)
  .skip(perPage*page)
  .populate({
      path: 'tasks',
      populate: [
          {
              path: 'task'
          },
        
      ]
  }).sort({
    dateOfCreation: 'desc'
  });
}


export const getSingleTask = async (req, res) => {
  Task.findById(req.params.taskId, (err, result) => {
      if (err) {
          res.status(500).json({
              error: err.message
          })
      } else {
          if (!result) {
              res.status(409).json({
                  message: "This task not existe"
              }
              );

          } else {
              res.status(200).json(
                  result
              )
          }
      }
  })
}


export const searchTasks = async (req, res) => {
  const inCommingValue = req.body.value;
  const perPage = 15;
  const page = Number(req.params.page);
  Task.find({ "title": { '$regex': inCommingValue.toUpperCase(), '$options': 'i' } }, (err, result) => {
      if (err) {
          res.status(500).json({
              error: err
          })
      } else {
        
          res.status(200).json({
              count: result.length,
              page: page, 
              tasks: result,
                           
          })
      }
  }).limit(perPage)
  .skip(perPage*page)
  .sort(
      {
        dateOfCompletion: 'desc'
      }
  )
  .populate('status');
}