import { ClassMiddleware, Controller, Post } from "@overnightjs/core";
import { Request, Response } from "express";

import { Beach } from "@src/models/beach";
import { authMiddleware } from "@src/middlewares/auth";

import { BaseController } from ".";

@Controller("beaches")
@ClassMiddleware(authMiddleware)
export class BeachesController extends BaseController {
  @Post("")
  public async create(request: Request, response: Response): Promise<void> {
    try {
      const beach = new Beach({ ...request.body, user: request.user?.id });
      const result = await beach.save();

      response.status(201).send(result);
    } catch (error) {
      this.sendCreateUpdatedErrorResponse(response, error);
    }
  }
}
