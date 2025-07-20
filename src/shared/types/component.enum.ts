export const Component = {
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  RestApplication: Symbol.for('RestApplication'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  UserService: Symbol.for('UserService'),
  UserModel: Symbol.for('UserModel'),
} as const;
