import { prop, getModelForClass, defaultClasses } from '@typegoose/typegoose';
import { UserType } from '../../types/user-type.enum.js';
import { User } from '../../types/user.type.js';
import { createSHA256 } from '../../helpers/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  constructor(userData: User) {
    super();
    this.name = userData.name;
    this.email = userData.email;
    this.avatarPath = userData.avatarPath;
    this.type = userData.type;
  }

  @prop({
    required: true,
    minlength: 1,
    maxlength: 15,
  })
  public name!: string;

  @prop({
    required: true,
    unique: true,
    match: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/,
  })
  public email!: string;

  @prop({
    required: false,
  })
  public avatarPath?: string;

  @prop({
    required: true,
    enum: UserType,
  })
  public type!: UserType;

  @prop({
    required: false,
  })
  public password?: string;

  public setPassword(password: string, salt: string): void {
    this.password = createSHA256(password, salt);
  }

  public getPassword(): string | undefined {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
