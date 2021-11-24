import { User }  from '../models/user.model';
import { getRepository } from "typeorm";

class UserService {
  async findAll() {
    return await getRepository(User).find({
      select: ["id","firstName", "lastName"],
    });
  }
}

export default new UserService();
