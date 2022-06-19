import express, { NextFunction, Request, Response } from "express";
import config from 'config';
import HttpException from "./utils/HttpException";
import swaggerUi from 'swagger-ui-express';
import logger from './utils/logger';
import morgan from 'morgan';
import cors from 'cors';
import LoggerStream from "./utils/LoggerStream";
import adminRouter from './routes/admin/AdminRouter';
import authRouter from "./routes/AuthRouter";
import authMiddleware from "./services/auth/AuthMiddleware";

const app = express();

//logging
app.use(morgan(config.get('log.morgan.format'), { stream: new LoggerStream }));

app.use(cors());
app.use(express.static('public'));

//routing
app.use(express.json());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(require('../swagger/swagger.json')));
app.use('/api/auth', authRouter.router);
app.use('/api/admin', authMiddleware.isMemberOf("admin"), adminRouter.router);

//error handling
app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    console.error(err)
    //console.error(err.origError);
    logger.error(err.origError?.message);
    logger.debug(req);

    res.statusCode = err.status;
    res.end(JSON.stringify(err.message));
  }
});

export default app;

//TODO: File upload