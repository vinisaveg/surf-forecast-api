import { Request, Response } from "express";

import { Controller, Get, Middleware, Post } from "@overnightjs/core";

import { User } from "@src/models/user";
import AuthService from "@src/services/auth";

import { BaseController } from ".";
import { authMiddleware } from "@src/middlewares/auth";

@Controller("users")
export class UsersController extends BaseController {
  @Post("")
  public async create(request: Request, response: Response): Promise<void> {
    try {
      const user = new User(request.body);

      const newUser = await user.save();

      response.status(201).send(newUser);
    } catch (error) {
      this.sendCreateUpdatedErrorResponse(response, error);
    }
  }

  @Post("authenticate")
  public async authenticate(
    request: Request,
    response: Response
  ): Promise<void | Response> {
    const { email, password } = request.body;
    const user = await User.findOne({ email });

    if (!user) {
      return this.sendErrorResponse(response, {
        code: 401,
        message: "User not found",
      });
    }

    if (!(await AuthService.comparePasswords(password, user.password))) {
      return this.sendErrorResponse(response, {
        code: 401,
        message: "Password does not match",
      });
    }

    const token = AuthService.generateToken(user.toJSON());
    response.status(200).send({ ...user.toJSON(), token });
  }

  @Get("me")
  @Middleware(authMiddleware)
  public async me(request: Request, response: Response): Promise<Response> {
    const email = request.user?.email;

    const user = await User.findOne({ email });

    if (!user) {
      return this.sendErrorResponse(response, {
        code: 404,
        message: "User not found!",
      });
    }

    return response.status(200).send({ user });
  }
}
