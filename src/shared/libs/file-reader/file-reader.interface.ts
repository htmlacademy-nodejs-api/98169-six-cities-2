import { EventEmitter } from 'node:events';

export interface FileReader extends EventEmitter {
  read(): void;
}
