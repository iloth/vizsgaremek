import config from 'config';
import logger from './utils/logger';
import mongoose from 'mongoose';
import app from './app';

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

//start server
const port = config.get('port');
app.listen(port, () => {
  logger.info(`Listening at http://localhost:${port}`);
});
