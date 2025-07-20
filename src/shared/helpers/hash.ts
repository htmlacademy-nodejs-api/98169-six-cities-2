import { createHash } from 'node:crypto';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = createHash('sha256');
  return shaHasher.update(line).update(salt).digest('hex');
};
