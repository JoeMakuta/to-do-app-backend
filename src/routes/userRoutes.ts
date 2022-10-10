import * as express from 'express';
import * as userControlllers from '../controller/userControllers';

const router = express.Router();

//Register
router.post('/signup', userControlllers.signup);

export default router;
