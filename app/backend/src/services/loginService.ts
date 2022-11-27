import { compare } from 'bcryptjs';
// import { IncomingHttpHeaders } from 'http2';
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

    if (user === null) return { status: 401, message: 'Incorrect email or password' };

    const compared = await compare(body.password, user.password);

    if (!compared) return { status: 401, message: 'Incorrect email or password' };

    const { password, ...data } = body;
    const token: IToken = this.auth.generateToken(data);

    return { status: 200, message: token };
  };

  validate = async (req: Request) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return { status: 401, message: 'Unauthorized' };
    }

    this.auth.authenticateToken({ token: authorization });

    const email = await this.auth.decodeToken(authorization);
    const user: Users | null = await this.model.findOne({ where: {
      email,
    } });

    if (user === null) {
      return { status: 401, message: 'Unauthorized' };
    }

    const { role } = user;

    return { status: 200, message: role };
  };
}
