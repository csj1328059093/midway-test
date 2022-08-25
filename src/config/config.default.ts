import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1661225754650_9760',
  koa: {
    port: 7001,
  },
  jwt: {
    secret: 'mySecret', // key
    expiresIn: 60 * 60 * 24, // token储存时长
  },
} as MidwayConfig;
