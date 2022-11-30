import Exception from '../middlewares/exception';
import Teams from '../database/models/Teams';

export default class TeamsService {
  private model;

  constructor() {
    this.model = Teams;
  }

  findAll = async () => {
    const result: Teams[] = await this.model.findAll();

    return { status: 200, message: result };
  };

  findOne = async (id: string) => {
    const result: Teams | null = await this.model.findOne({ where: { id: Number(id) } });

    if (result === null) {
      throw new Exception(404, 'Team not found');
    }

    return { status: 200, message: result };
  };
}
