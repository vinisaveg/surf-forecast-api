import { Server } from "@overnightjs/core";
import express, { Application } from "express";
import expressPino from "express-pino-logger";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { OpenApiValidator } from "express-openapi-validator";
import { OpenAPIV3 } from "express-openapi-validator/dist/framework/types";

import { BeachesController } from "./controllers/beaches";
import { ForecastController } from "./controllers/forecast";
import { UsersController } from "./controllers/users";

import * as database from "./database";
import logger from "./logger";

import apiSchema from "./api.schema.json";
import { apiErrorValidator } from "./middlewares/api-error-validator";

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    await this.docsSetup();
    this.setupControllers();
    await this.databaseSetup();
    this.setupErrorHandlers();
  }

  private setupExpress(): void {
    this.app.use(express.json());
    this.app.use(
      expressPino({
        logger,
      })
    );
    this.app.use(
      cors({
        origin: "*",
      })
    );
  }

  private setupErrorHandlers(): void {
    this.app.use(apiErrorValidator);
  }

  private setupControllers(): void {
    const forecastController = new ForecastController();
    const beachesController = new BeachesController();
    const usersController = new UsersController();

    this.addControllers([
      forecastController,
      beachesController,
      usersController,
    ]);
  }

  private async databaseSetup(): Promise<void> {
    await database.connect();
  }

  public async close(): Promise<void> {
    await database.close();
  }

  public start(): void {
    this.app.listen(this.port, () => {
      logger.info(`Server listening on port: ${this.port}`);
    });
  }

  private async docsSetup(): Promise<void> {
    this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(apiSchema));
    await new OpenApiValidator({
      apiSpec: apiSchema as OpenAPIV3.Document,
      validateRequests: true,
      validateResponses: true,
    }).install(this.app);
  }

  public getApp(): Application {
    return this.app;
  }
}
