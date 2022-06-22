import { Request, Response, NextFunction } from "express";
import { createLogger } from "winston";
import { IUser, userModel } from "../../models/userModel";
import UserService from "../../services/UserService";
import HttpException from "../../utils/HttpException";
import UserController from "../UserController";

const mockData = [
  {
     _id: "6294f9af56fdf87a5772ef09",
     name: "Gilbert Dixon",
     email: "gilbertdixon@plutorque.com",
     password: "",
     address: { zip: 9325, city: "Cassel", address:"Schermerhorn Street 2594" },
     active: true,
     roles: ["user"]
  },
  {
    _id: "6294f9af56fdf87a5772ef11",
    name: "Bridges Odonnell",
    email: "bridgesodonnell@plutorque.com",
    password:"",
    address: {zip: 7316, city: "Wintersburg", address: "Langham Street 1128"},
    active: true,
    roles: ["admin"]
  },
  {
    _id: "6294f9af56fdf87a5772ef15",
    name: "Clarice Cochran",
    email: "claricecochran@plutorque.com",
    password:"",
    address: {zip: 1792, city: "Waterloo", address: "lliott Place 2867"},
    active: true,
    roles: ["empl"]
  }
];

const newUser = {
  name: "Charlie Firpo",
  email: "CharlieFirpo@pariedispari.com",
  password:"Bud Spencer",
  address: {zip: 1234, city: "Miami", address: "Green Frog street 1"},
  active: true,
  roles: ["user"]
};

jest.mock('../../services/UserService', () => ({
  get: jest.fn<Promise<IUser>, [string]>(async (id: string) => mockData.find(data => data._id == id) as any),
  getAll: jest.fn<Promise<IUser[]>, []>(async () => mockData as any[]),
  create: jest.fn<Promise<IUser>, [any]>(async (user: any) => {
    user.id = "123456789123456789";
    user.password = "";
    console.log(user);
    return user;
  }),
  update: jest.fn(),
  delete: jest.fn(),
  checkPassword: jest.fn(), 
  resetPassword: jest.fn()
}) as any);

describe('UserController', ()=> {

  let res: Response = {} as any;
  let next: NextFunction = jest.fn() as any;

  beforeEach( () => {
    res =  {
      end: jest.fn(),
      json: jest.fn(),
      status: jest.fn()
    } as any;
    next = jest.fn() as any;
  });
  
  afterEach( () => {
    jest.clearAllMocks();
  });

  const userController = UserController;

  test('getAll(): Should get all 3 users', async ()=> {
    const req = {} as any;

    await userController.getAll(req, res, next);

    expect(UserService.getAll).toBeCalled();
    expect(res.json).toBeCalled();
    expect(next).not.toBeCalled();
  });

  test('get(): Should get the 1. user', async ()=> {
    const user = mockData[0];
    const req = {
      params: { id: user._id }
    } as any;

    await userController.get(req, res, next);

    expect(UserService.get).toBeCalled();
    expect(res.json).toBeCalledWith(user);
    expect(next).not.toBeCalled();
  });

  test('create(): Should get the new user', async ()=> {
    const req = {
      body: { ...newUser }
    } as any;

    let exceptedUser = { ...newUser, id: "123456789123456789", password: "" };

    await userController.create(req, res, next);

    expect(UserService.create).toBeCalled();
    expect(res.json).toBeCalledWith(exceptedUser);
    expect(next).not.toBeCalled();
  });

});

