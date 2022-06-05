import { BaseRouter } from "../BaseRouter";
import userRouter from './UserRouter';
import burgerPartRouter from './BurgerPartRouter';

class AdminRouter extends BaseRouter {
  constructor() {
    super();

    this.router.use('/users', userRouter.router);
    this.router.use('/parts', burgerPartRouter.router);
  }  
}

export default new AdminRouter();