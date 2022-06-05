import express, { Router } from 'express'

export abstract class BaseRouter {

  router: Router = express.Router();

}
