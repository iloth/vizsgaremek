import express from 'express';
import users from './usersRoute';
import parts from './burgerPartsRoute';

const router = express.Router()

router.use('/users', users);
router.use('/parts', parts);

export default router;