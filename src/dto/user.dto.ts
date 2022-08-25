import { Rule, RuleType } from '@midwayjs/validate';

import { ApiProperty } from '@midwayjs/swagger';

export class UserLoginDTO {
  @Rule(RuleType.string().required())
  @ApiProperty({
    example: 'jack',
    description: '用于登录的用户名',
  })
  username: string;

  @Rule(RuleType.string().required())
  @ApiProperty({
    example: 'redballoon',
    description: '用于登录的密码',
  })
  password: string;
}
