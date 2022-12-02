import * as express from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const leaderboardRouter = express.Router();

const controller = new LeaderboardController();

leaderboardRouter.get('/home', controller.findAll);
leaderboardRouter.get('/away', controller.findAll);
leaderboardRouter.get('/', controller.findAll);

export default leaderboardRouter;
