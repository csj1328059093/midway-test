import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { UserEntity } from './entity/User.entity';

export const dbConnection = createConnection({
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  entities: [UserEntity],
  synchronize: true,
  logging: false,
});
