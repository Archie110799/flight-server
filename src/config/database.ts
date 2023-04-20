import * as dotenv from 'dotenv';
// import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
dotenv.config();

const DatabaseConfigs = {
  // connection: (process.env.DB_TYPE || 'mysql') as MysqlConnectionOptions['type'],
  host: process.env.DB_HOSTNAME,
  port: parseInt(process.env.DB_PORT as string, 10) || 3360,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};

export default DatabaseConfigs;
