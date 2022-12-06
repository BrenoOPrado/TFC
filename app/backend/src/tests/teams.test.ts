import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import teams from './mocks/teams';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Route tests "/teams"', () => {
  it('Get all teams', () => {
    chai.request(app).get('/teams').then((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.equal(teams);
    });
  });

  it('Get team by id', () => {
    chai.request(app).get('/teams/:1').then((response) => {
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.equal({
        "id": 1,
        "teamName": "Avaí/Kindermann"
      });
    });
  });

  it('Get team by invalid id', () => {
    chai.request(app).get('/teams/:99999999').then((response) => {
      expect(response.status).to.be.equal(404);
      expect(response.body.message).to.be.equal('Team not found');
    });
  });
});
