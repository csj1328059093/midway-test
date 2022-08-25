import { UserLoginDTO } from '../dto/user.dto';
import { JwtService } from '@midwayjs/jwt';
import { Inject, Controller, Body, Post } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { UserEntity } from '../entity/User.entity';
import { dbConnection } from '../data-source';
import { Validate } from '@midwayjs/validate';

// const userModel = new UserModel();

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  jwt: JwtService;

  @Post('/user/login')
  @Validate()
  async loginUser(@Body() body: UserLoginDTO) {
    const ds = await dbConnection;
    const db = await ds.getRepository(UserEntity);
    const saveUser = new UserEntity();
    saveUser.username = 'jack';
    saveUser.password = 'redballoon';
    await db.save(saveUser);
    const user = await this.userService.loginUser(body);
    if (user) {
      const user = {
        id: 1,
        username: 'admin',
        password: '123456',
      };
      const token = await this.jwt.sign({ ...user });
      return {
        code: 200,
        result: 'success',
        message: '登录成功',
        data: {
          token,
        },
      };
    } else {
      return {
        code: 400,
        result: 'error',
        message: '账号或密码不正确',
        data: null,
      };
    }
  }
}
