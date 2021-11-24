import { User } from "../models/user.model";
import { getRepository } from "typeorm";

class ApplicationService {
  async login(requestBody: any) {
    let currentUser = await getRepository(User).findOne({ email: requestBody.email });

    if (currentUser && currentUser.comparePassword(requestBody.password)) {
      return { flash: "success" };
    } else {
      return { flash: "failed" };
    }
  }

  async signUp(requestBody: any) {
    const newUser = getRepository(User).create(
      requestBody
    );
    const result = await getRepository(User).save(newUser)
    return result
  }
}

export default new ApplicationService();
