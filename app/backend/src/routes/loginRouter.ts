import * as express from 'express';
import LoginController from '../controllers/loginController';

const loginRouter = express.Router();

const controller = new LoginController();

loginRouter.post('/', controller.insert);

export default loginRouter;
