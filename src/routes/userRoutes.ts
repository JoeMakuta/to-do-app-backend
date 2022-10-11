import * as express from 'express';
import * as userControlllers from '../controller/userControllers';

const router = express.Router();

//Register
router.post('/signup', userControlllers.signup);

//Signin
router.post('/signin', userControlllers.signin);

export default router;
