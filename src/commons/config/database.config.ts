import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  // postgres_host: process.env.POSTGRES_HOST || 'localhost',
  // postgres_user: process.env.POSTGRES_USER,
  // postgres_pw: process.env.POSTGRES_PASSWORD,
  // postgres_db: process.env.POSTGRES_DB,
  // postgres_port: Number(process.env.POSTGRES_PORT || '5432'),
  mongo: {
    uri: process.env.MONGO_URI,
  },
}));
