import { IUser } from '../../src/user/interfaces/user.interface';

export const mockedUser: IUser = {
  id: '017480d7-2077-4888-bf20-ca7a65f45896',
  login: 'testUser',
  password: 'testPass8',
  age: 30,
  isDeleted: false,
  groups: []
};

export const mockedAdmin: IUser = {
  id: '017480d7-2077-4888-bf20-ca7a65f45256',
  login: 'testAdmin',
  password: 'testPa12ss',
  age: 35,
  isDeleted: false,
  groups: []
};
