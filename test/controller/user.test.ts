import {createApp, close, createHttpRequest} from '@midwayjs/mock';
import {Framework, Application} from '@midwayjs/koa';

describe('test/controller/user.test.ts', () => {

  let app: Application;

  beforeAll(async () => {
    // 只创建一次 app，可以复用
    try {
      // 由于Jest在BeforeAll阶段的error会忽略，所以需要包一层catch
      // refs: https://github.com/facebook/jest/issues/8688
      app = await createApp<Framework>();
    } catch (err) {
      console.error('test beforeAll error', err);
      throw err;
    }
  });

  afterAll(async () => {
    // close app
    await close(app);
  });

  it('正常登录测试', async () => {
    const result = await createHttpRequest(app).post('/api/user/login').send({
      username: 'jack',
      password: 'redballoon'
    });

    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({
      code: 200,
      result: 'success',
      message: '登录成功',
    });
    expect(result.body).toHaveProperty('data.token')
  });

  it('异常登录测试', async () => {
    const result = await createHttpRequest(app).post('/api/user/login').send({
      username: 'jack',
      password: 'xxxxx'
    });

    expect(result.status).toBe(200);
    expect(result.body).toStrictEqual({
      code: 400,
      result: 'error',
      message: '账号或密码不正确',
      data: null,
    });
  });

});
