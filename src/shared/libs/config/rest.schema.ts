import convict from 'convict';
import 'convict-format-with-validator';

export type RestSchema = {
  PORT: number;
};

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 4000,
  },
});
