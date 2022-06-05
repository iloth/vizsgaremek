import express from 'express';
import userRouter from './UserRouter';
import burgerPartRouter from './BurgerPartRouter';

const router = express.Router()

router.use('/users', userRouter.router);
router.use('/parts', burgerPartRouter.router);

export default router;