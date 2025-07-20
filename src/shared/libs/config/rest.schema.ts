import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type RestSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_PORT: string;
  DB_NAME: string;
};

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 4000,
  },
  SALT: {
    doc: 'Salt for password hashing',
    format: String,
    env: 'SALT',
    default: null,
  },
  DB_HOST: {
    doc: 'Database host (IP or URL)',
    format: String,
    env: 'DB_HOST',
    default: 'localhost',
  },
  DB_USERNAME: {
    doc: 'Database username',
    format: String,
    env: 'DB_USERNAME',
    default: null,
  },
  DB_PASSWORD: {
    doc: 'Database password',
    format: String,
    env: 'DB_PASSWORD',
    default: null,
  },
  DB_PORT: {
    doc: 'Database port',
    format: String,
    env: 'DB_PORT',
    default: '27017',
  },
  DB_NAME: {
    doc: 'Database name',
    format: String,
    env: 'DB_NAME',
    default: 'six-cities',
  },
});
