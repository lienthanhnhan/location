import { DataSource } from 'typeorm';

export const datasource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../../src/**/*.entity.{js,ts}'],
  migrations: ['../migrations/*.ts'],
  schema: 'public',
  migrationsRun: false,
  logging: true,
  synchronize: false,
});
