import * as express from 'express';
import IUser from '../types/User';
import User from '../models/User';
import httpStatusCode from 'http-status-codes';
import * as createError from 'http-errors';
import { userRegisterSchema } from '../helpers/schemaValidation';

export const signup = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  try {
    const result: IUser = await userRegisterSchema.validateAsync(req.body);

    const isExist = await User.findOne({ username: result.username }).catch(
      (error) => next(error),
    );

    if (isExist) {
      throw new createError.Conflict('User already exist');
    }

    const newUser = new User({ ...result });

    await newUser.save();

    res.status(httpStatusCode.OK).json({
      message: `Created successful`,
      data: result,
      success: true,
    });
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};
