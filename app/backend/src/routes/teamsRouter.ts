import * as express from 'express';
import TeamsController from '../controllers/teamsController';

const teamsRouter = express.Router();

const controller = new TeamsController();

teamsRouter.get('/', controller.findAll);
teamsRouter.get('/:id', controller.findOne);

export default teamsRouter;
