import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { UserEntity } from '../entity/User.entity';
import { dbConnection } from '../data-source';

export class UserModel {
  @InjectEntityModel(UserEntity)
  userRepo: Repository<UserEntity>;

  /**
   * 根据用户名和密码获取用户信息
   * @param username {String} 用户名
   * @param password {String} 用户密码
   */
  async getUserByUsernameAndPassword(username, password): Promise<UserEntity> {
    const ds = await dbConnection;
    const db = await ds.getRepository(UserEntity);
    return await db.findOneBy({ username, password });
  }
}
