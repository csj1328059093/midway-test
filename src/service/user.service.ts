import { Provide } from '@midwayjs/decorator';
import { IUserOptions } from '../interface';
import { UserModel } from '../model/user.model';
// import {UserLoginDTO} from '../dto/user.dto';

const userModel = new UserModel();

@Provide()
export class UserService {
  async loginUser(options: IUserOptions) {
    const { username, password } = options;
    return await userModel.getUserByUsernameAndPassword(username, password);
  }
}
