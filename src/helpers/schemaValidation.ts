import * as joi from '@hapi/joi';

export const userRegisterSchema = joi.object({
  username: joi.string().required().max(30),
  password: joi.string().required().min(7),
  email: joi.string().required().email(),
  profileImage: joi.string(),
  bio: joi.string(),
});

export const userSinginSchema = joi.object({
  email: joi.string().required().email(),
  password: joi.string().required(),
});

export const createTaskSchema = joi.object({
  title: joi.string().required(),
  description: joi.string(),
  dateOfCreation: joi.date(),
  dateOfCompletion: joi.date(),
  status: joi.string(),
});
