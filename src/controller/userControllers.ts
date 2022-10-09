import * as express from 'express';
import IUser from '../types/User';
import User from '../models/User';
import httpStatusCode from 'http-status-codes';

export const signup = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  const register = async (input: IUser) => {
    return await User.create(input);
  };

  try {
    const newUser = await register(req.body);
    if (newUser)
      res.status(httpStatusCode.OK).json({
        message: 'Created successful',
        data: newUser,
      });
  } catch (error) {
    console.log(error);
  }
};
