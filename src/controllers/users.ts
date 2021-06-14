import { Request, Response } from "express";

import { Controller, Post } from "@overnightjs/core";

import { User } from "@src/models/user";

import { BaseController } from ".";

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
}
