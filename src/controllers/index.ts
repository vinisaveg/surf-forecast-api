import { CUSTOM_VALIDATION } from "@src/models/user";
import { Response } from "express";
import mongoose from "mongoose";

export abstract class BaseController {
  protected sendCreateUpdatedErrorResponse(
    response: Response,
    error: mongoose.Error.ValidationError | Error
  ): void {
    if (error instanceof mongoose.Error.ValidationError) {
      const clientErrors = this.handleClientErrors(error);
      response
        .status(clientErrors.code)
        .send({ code: clientErrors.code, error: clientErrors.error });
    } else {
      response.status(500).send({ code: 500, error: "Something went wrong!" });
    }
  }

  private handleClientErrors(error: mongoose.Error.ValidationError): {
    code: number;
    error: string;
  } {
    const duplicatedKindErrors = Object.values(error.errors).filter(
      (error) => error.kind === CUSTOM_VALIDATION.DUPLICATED
    );

    if (duplicatedKindErrors.length) {
      return { code: 409, error: error.message };
    } else {
      return { code: 422, error: error.message };
    }
  }
}
