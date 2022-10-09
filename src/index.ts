import * as dotenv from 'dotenv';
import App from './app';
import * as http from 'http'

dotenv.config();

const app: App = new App();
let server: http.Server;

const serverListening = (): void => {
  console.log(`Listening on port ${process.env.PORT}`);
};

const serverError = (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind =
    typeof process.env.PORT === 'string'
      ? 'Pipe ' + process.env.PORT
      : 'Port ' + process.env.PORT;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

app
  .init()
  .then(() => {
    app.express.set('port', process.env.PORT);
    server = app.server;
    server.on('error', serverError);
    server.on('listening', serverListening);

    server.listen(process.env.PORT);
  })
  .catch((error) => {
    console.log(error);
  });

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
  // logger.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
});
