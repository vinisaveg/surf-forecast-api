import { NextFunction, Request, Response } from "express";

import AuthService from "@src/services/auth";

export function authMiddleware(
  request: Partial<Request>,
  response: Partial<Response>,
  next: NextFunction
): void {
  const token = request.headers?.["x-access-token"];

  try {
    const decodedUser = AuthService.decodeToken(token as string);

    request.user = decodedUser;

    next();
  } catch (error) {
    response.status?.(401).send({ code: 401, error: error.message });
  }
}
