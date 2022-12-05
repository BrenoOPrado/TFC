import { compare } from 'bcryptjs';
import { Request } from 'express';
import { IToken, ILogin } from '../interfaces';
import AuthMiddleware from '../middlewares/authMiddleware';
import Users from '../database/models/Users';

export default class LoginService {
  private auth;
  private model;

  constructor() {
    this.auth = new AuthMiddleware();
    this.model = Users;
  }

  insertLogin = async (body:ILogin) => {
    const user: Users | null = await this.model.findOne({ where: {
      email: body.email,
    } });

    if (user === null) return { status: 401, message: { message: 'Incorrect email or password' } };

    const compared = await compare(body.password, user.password);

    if (!compared) return { status: 401, message: { message: 'Incorrect email or password' } };

    const token: IToken = this.auth.generateToken(user);

    return { status: 200, message: token };
  };

  validate = async (req: Request) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return { status: 401, message: { message: 'Unauthorized' } };
    }

    const user = await this.auth.decodeToken(authorization);

    if (user === null) {
      return { status: 401, message: { message: 'Unauthorized' } };
    }

    return { status: 200, message: { role: user.dataValues.role } };
  };
}
