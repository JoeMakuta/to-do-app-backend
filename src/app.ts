import * as express from 'express';
import * as http from 'http';
import helmet from 'helmet';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import httstatusCode from 'http-status-codes';
import connectDatabase from './config/database'
import userRoutes from './routes/userRoutes'
dotenv.config();

export default class App {
  public express: express.Application;
  public server: http.Server;

  public async init(): Promise<void> {
    this.express = express();
    this.server = http.createServer(this.express);
    this.connectDatabase()
    this.middleware();
    this.routes();
  }

  private routes(): void {
    this.express.get('/', this.baseRoute);
    this.express.use('/users' , userRoutes)
  }

  private connectDatabase(): void {
    connectDatabase(process.env.MONGODB_URI)
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
