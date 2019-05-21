import 'dotenv/config';

const env = process.env;

export default {
  mongoUrl:
    env.DB_HOST && env.DB_NAME
      ? 'mongodb://' + env.DB_HOST + '/' + env.DB_NAME
      : 'mongodb://localhost/',
  admin_user: env.DB_USER || 'admin',
  admin_password: env.DB_PASSWORD || 'admin',
  currEnv: env.NODE_ENV || 'development',
  port: env.PORT || 8081,
  apiVersion: 'v1',
};
