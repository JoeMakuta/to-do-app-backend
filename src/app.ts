import * as express from 'express';
import * as http from 'http';
import helmet from 'helmet';
import * as createError from 'http-errors';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import httstatusCode from 'http-status-codes';
import connectDatabase from './config/database';
import * as userControllers from './controller/userControllers';
import * as taskControllers from './controller/taskController';
dotenv.config();

export default class App {
  public express: express.Application;
  public server: http.Server;

  public async init(): Promise<void> {
    this.express = express();
    this.server = http.createServer(this.express);
    this.connectDatabase();
    this.middleware();
    this.routes();
    this.handleError();
  }

  private routes(): void {
    this.express.get('/', this.baseRoute);
    this.express.post('/signup', userControllers.signup);
    this.express.post('/signin', userControllers.signin);
    this.express.post('/createTask', taskControllers.createTask);
    this.express.put('/updateTask/:id', taskControllers.updateTask);
    this.express.delete('/deleteTask/:id', taskControllers.deleteTask);
    // this.express.get('/getTask', taskControllers.getTasks);
    // this.express.get('/fetchTask', taskControllers.fetchTask);
    // this.express.get('/getSingleTask/:id', taskControllers.getSingleTask);
    // this.express.post('/search/task/:page', taskControllers.searchTasks);
  }

  private connectDatabase(): void {
    connectDatabase(process.env.MONGODB_URI);
  }

  private handleError(): void {
    this.express.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        next(new createError.NotFound('URL Not Found'));
      },
    );

    this.express.use(
      (
        err: { status: number; message: string },
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        res.status(err.status || 500);
        res.json({
          message: err.message,
          data: null,
          success: false,
          error: err,
        });
      },
    );
  }

  private baseRoute = (req: express.Request, res: express.Response): void => {
    res.status(httstatusCode.OK).json({ message: 'App is running' });
  };

  private middleware(): void {
    this.express.use(express.json());
    this.express.use(helmet());
    this.express.use(cors());
  }
}
