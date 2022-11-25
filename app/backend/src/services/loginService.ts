import { compare } from 'bcryptjs';
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
    const users: Users | null = await this.model.findOne({ where: {
      email: body.email,
    } });

    if (users === null || !await compare(body.password, users.password)) {
      return { status: 401, message: 'Incorrect email or password' };
    }

    const { password, ...data } = body;
    const token: IToken = this.auth.generateToken(data);

    return { status: 200, message: token };
  };
}
