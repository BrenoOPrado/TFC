import * as express from 'express';
import validateLoginBody from '../middlewares/validateLoginBody';
import LoginController from '../controllers/loginController';
import validateToken from '../middlewares/validateToken';

const loginRouter = express.Router();

const controller = new LoginController();

loginRouter.post('/', validateLoginBody, controller.insert);
loginRouter.get('/validate', validateToken, controller.validate);

export default loginRouter;
