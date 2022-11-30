import { Request, Response } from 'express';
import LoginService from '../services/loginService';

export default class LoginController {
  constructor(private service = new LoginService()) {}

  insert = async (req: Request, res: Response) => {
    const result = await this.service.insertLogin(req.body);
    const { status, message } = result;

    if (status !== 200) {
      return res.status(status).json({ message });
    }
    return res.status(status).json(message);
  };

  validate = async (req: Request, res: Response) => {
    const result = await this.service.validate(req);

    if (result !== null) {
      return res.status(result.status).json(result.message);
    }
  };
}
