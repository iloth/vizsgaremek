import express, { NextFunction, Request, Response } from "express";
import HttpException from "./utils/HttpException";
import config from 'config';
import swaggerUi from 'swagger-ui-express';
import logger from './utils/logger';
import morgan from 'morgan';
import mongoose from 'mongoose';
import LoggerStream from "./utils/LoggerStream";
import adminRouter from './routes/admin/adminRoute';

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

//routing
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('../config/swagger.json')));
app.use('/api/admin', adminRouter);

//error handling
app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    logger.error(err.message);

    res.statusCode = err.status;
    res.end(JSON.stringify(err));
  }
});

//server
const port = config.get('port');
app.listen(port, () => {
  logger.info(`Listening at http://localhost:${port}`);
});
