import express, { NextFunction, Request, Response } from "express";
import HttpException from "./utils/HttpException";
import config from 'config';
import swaggerUi from 'swagger-ui-express';
import logger from './utils/logger';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import LoggerStream from "./utils/LoggerStream";
import adminRouter from './routes/admin/AdminRouter';
import mainRouter from './routes/MainRouter';

const app = express();

//db connection
mongoose.Promise = global.Promise;
mongoose
  .connect(config.get('database.connection'))
  .then(() => {
    logger.info('Connected to database');
  })
  .catch((err: Error) => {
    logger.error(err.message);
    process.exit;
  });

//logging
app.use(morgan(config.get('log.morgan.format'), { stream: new LoggerStream }));

app.use(cors());

//routing
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('../config/swagger.json')));
app.use('/', mainRouter.router)
app.use('/api/admin', adminRouter.router);

//error handling
app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    console.error(err.origError);
    logger.error(err.origError.message);
    logger.debug(req);

    res.statusCode = err.status;
    res.end(JSON.stringify(err.message));
  }
});

//server
const port = config.get('port');
app.listen(port, () => {
  logger.info(`Listening at http://localhost:${port}`);
});
