import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';
import Matches from '../database/models/Matches';
import { matches } from './mocks/matches';
import leaderboard, { leaderboardAway, leaderboardHome } from './mocks/leaderboard';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Route tests "/leaderboard"', () => {
  it('General leaderboard', () => {
    chai.request(app).get('/leaderboard').then((response) => {
      expect(response.body).to.be.equal(leaderboard);
    });
  });

  describe('Route tests "/leaderboard/home"', () => {
    it('Home leaderboard', () => {
      chai.request(app).get('/leaderboard/home').then((response) => {
        expect(response.body).to.be.equal(leaderboardHome);
      });
    });
  });

  describe('Route tests "/leaderboard/away"', () => {
    it('Away leaderboard', () => {
      chai.request(app).get('/leaderboard/away').then((response) => {
        expect(response.body).to.be.equal(leaderboardAway);
      });
    });
  });
});
