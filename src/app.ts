import * as express from 'express';
import * as http from 'http';
import helmet from 'helmet';
import * as cors from 'cors';
import httstatusCode from 'http-status-codes';

export default class App {
    public express: express.Application;
    public server: http.Server;


    public async init(): Promise<void> {
        this.express = express();
        this.server = http.createServer(this.express);
        this.middleware();
        this.routes();
        // connect to the database
    }

    private routes(): void {
        this.express.get('/', this.baseRoute);
    }

    private baseRoute = (req: express.Request, res: express.Response): void => {
        res.status(httstatusCode.OK).json({ message: 'App is running' });
    }

    private middleware(): void {
        this.express.use(express.json());
        this.express.use(helmet());
        this.express.use(cors());
    }
}
