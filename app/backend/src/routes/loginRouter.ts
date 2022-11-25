import * as express from 'express';
import validateLoginBody from '../middlewares/validateLoginBody';
import LoginController from '../controllers/loginController';

const loginRouter = express.Router();

const controller = new LoginController();

loginRouter.post('/', validateLoginBody, controller.insert);
loginRouter.get('/validate', validateLoginBody, controller.validate);

export default loginRouter;
