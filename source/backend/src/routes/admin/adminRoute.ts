import express from 'express';
import users from './usersRoute';

const router = express.Router()

router.use('/users', users);

export default router;