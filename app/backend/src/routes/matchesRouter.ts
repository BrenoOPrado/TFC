import * as express from 'express';
import MatchesController from '../controllers/matchesController';

const matchesRouter = express.Router();

const controller = new MatchesController();

matchesRouter.get('/', controller.findAll);

export default matchesRouter;
