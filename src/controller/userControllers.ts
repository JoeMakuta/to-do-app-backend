import * as express from 'express';
import IUser from '../types/User';
import User from '../models/User';
import httpStatusCode from 'http-status-codes';
import * as createError from 'http-errors';
import {
  userRegisterSchema,
  userSinginSchema,
} from '../helpers/schemaValidation';
import * as bcrypt from 'bcrypt';
import { signAccessToken } from '../helpers/jwt';

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

    const savedUser = await newUser.save();

    res.status(httpStatusCode.OK).json({
      message: `Created successful`,
      data: savedUser,
      success: true,
    });
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

export const signin = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  try {
    const result = await userSinginSchema.validateAsync(req.body);

    const user = await User.findOne({ email: result.email }).catch((error) =>
      next(error),
    );

    if (!user) throw new createError.NotFound('User not Register');

    const isMacthPassword = await bcrypt.compare(
      result.password,
      user.password,
    );

    if (!isMacthPassword) {
      throw new createError.Unauthorized('Invalid username or password');
    }
    const accessToken = await signAccessToken(user._id.toString());

    res.status(httpStatusCode.OK).json({
      message: `Authentificated as ${result.email}`,
      accessToken,
      success: true,
    });
  } catch (error) {
    if (error.isJoi) {
      return next(new createError.BadRequest('Invalid username or password'));
    }
    next(error);
  }
};
