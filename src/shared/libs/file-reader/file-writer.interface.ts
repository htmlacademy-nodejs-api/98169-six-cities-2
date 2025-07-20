import { EventEmitter } from 'node:events';

export interface FileWriter extends EventEmitter {
  write(data: unknown): void;
  end(): void;
}
