import { DataSource } from 'typeorm';
import { User } from '../entity/User';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'user_management',
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});