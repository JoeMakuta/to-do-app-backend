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
    if (newUser) {
    
      return res.status(httpStatusCode.OK).json({
        message: 'Created successful',
        data: newUser,
      });
     
}
return res.status(httpStatusCode.BAD_REQUEST).json({ message: 'bad request', data: null, success: false })
  } catch (error) {
    console.log(error);
    return res.status(httpStatusCode.BAD_REQUEST).json({ message: 'bad request', data: null, success: false, error })
  }
};
