import * as express from 'express';
import insertConditions from '../middlewares/insertConditions';
import MatchesController from '../controllers/matchesController';
import validateToken from '../middlewares/validateToken';

const matchesRouter = express.Router();

const controller = new MatchesController();

matchesRouter.get('/', controller.findAll);
matchesRouter.post('/', validateToken, insertConditions, controller.insert);
matchesRouter.patch('/:id/finish', controller.finish);
matchesRouter.patch('/:id', controller.goalTeam);

export default matchesRouter;
