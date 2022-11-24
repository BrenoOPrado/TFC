import { Request, Response } from 'express';
import LoginService from '../services/loginService';

export default class LoginController {
  constructor(private service = new LoginService()) {}

  insert = async (req: Request, res: Response): Promise<void> => {
    const result = await this.service.insertLogin(req.body);
    const { status, message } = result;

    if (result.status !== 200) {
      res.status(status).json(result.message);
    }
    res.status(status).json({ message });
  };
}
