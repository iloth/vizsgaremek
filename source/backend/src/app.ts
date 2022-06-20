import express, { NextFunction, Request, Response } from "express";
import config from 'config';
import HttpException from "./utils/HttpException";
import swaggerUi from 'swagger-ui-express';
import logger from './utils/logger';
import morgan from 'morgan';
import cors from 'cors';
import LoggerStream from "./utils/LoggerStream";
import authMiddleware from "./services/AuthMiddleware";
import myRouter from './routes/MyRouter';
import adminRouter from './routes/AdminRouter';
import authRouter from "./routes/AuthRouter";
import favouriteRouter from "./routes/FavouriteRoute";
import orderRouter from "./routes/OrderRouter";
import orderItemRouter from "./routes/OrderItemRouter";

const app = express();

//logging
app.use(morgan(config.get('log.morgan.format'), { stream: new LoggerStream }));

app.use(cors());
app.use(express.static('public'));
app.use(express.json()); 

//routing
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(require('./swagger/swagger.json')));
app.use('/api/auth', authRouter.router);
app.use('/api/my', authMiddleware.isLoggedIn, myRouter.router);
app.use('/api/admin', authMiddleware.isMemberOf('admin'), adminRouter.router);
app.use('/api/favourites', authMiddleware.isMemberOf(['admin', 'empl']), favouriteRouter.router);
app.use('/api/orders', authMiddleware.isMemberOf(['admin', 'empl']), orderRouter.router);
app.use('/api/orderitems', authMiddleware.isMemberOf(['admin', 'empl']), orderItemRouter.router);

//error handling
app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    //console.error(err)
    //console.error(err.origError);
    logger.error(`${err.message}: ${err.origError?.message}`);
    logger.debug(req);

    res.statusCode = err.status;
    res.json({ error: err.message, details: err.origError?.message});
  }
});

export default app;

//TODO: File upload 