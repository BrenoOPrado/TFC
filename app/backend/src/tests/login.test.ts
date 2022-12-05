import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';
import user from './mocks/user';
import Users from '../database/models/Users';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Route tests "/login"', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(user as Users);
  });

  afterEach(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  });

  it('Success in the operation', () => {
    chai.request(app).post('/login').send({
      "email": "user@user.com",
      "password": "secret_user"
    }).then((response) => {
      expect(response.status).to.be.equal(200);
    });
  });

  it('Operation without email', () => {
    chai.request(app).post('/login').send({
      "password": "secret_user"
    }).then((response) => {
      expect(response.status).to.be.equal(400);
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });
  });

  it('Operation without password', () => {
    chai.request(app).post('/login').send({
      "email": "user@user.com"
    }).then((response) => {
      expect(response.status).to.be.equal(400);
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });
  });

  it('Operation with incorrect password', () => {
    chai.request(app).post('/login').send({
      "email": "user@user.com",
      "password": "invalid_secret_user"
    }).then((response) => {
      expect(response.status).to.be.equal(401);
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
    });
  });
});
