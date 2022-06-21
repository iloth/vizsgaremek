import { IUser, userModel } from "../../models/userModel";
import UserService from "../../services/UserService";
import UserController from "../UserController";
import { Request, Response, NextFunction } from 'express';
import { mockRequest, mockResponse } from 'jest-mock-req-res';

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

jest.mock('../../services/UserService', () => ({
  get: jest.fn<IUser, [string]>((id: string) => mockData.find(data => data._id == id) as any),
  getAll: jest.fn<IUser[], []>(() => mockData as any[]),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  checkPassword: jest.fn(), 
  resetPassword: jest.fn()
}) as any);

describe('UserController', ()=> {

  let res = mockResponse();
  let next = jest.fn();

  beforeEach( () => {
    res = mockResponse();
  });
  
  const userController = UserController;

  test('Should get 3 users', ()=> {
    let req = mockRequest();

    userController.getAll(req, res, next);

    expect(UserService.getAll).toBeCalled();
    expect(res.json).toBeCalled();
    expect(next).not.toBeCalled();

  })

  test('Should get the 1. user', ()=> {
    const user = mockData[0];
    let req = mockRequest({
      id: user._id
    });

    userController.get(req, res, next);

    expect(UserService.get).toBeCalled();
    expect(res.json).toBeCalledWith(user);
    expect(next).not.toBeCalled();
  })


});

