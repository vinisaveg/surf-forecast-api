import { Server } from "@overnightjs/core";
import express, { Application } from "express";

import { BeachesController } from "./controllers/beaches";
import { ForecastController } from "./controllers/forecast";
import { UsersController } from "./controllers/users";

import * as database from "./database";
import logger from "./logger";

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
    await this.databaseSetup();
  }

  private setupExpress(): void {
    this.app.use(express.json());
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
      logger.info("Server listening on port:", this.port);
    });
  }

  public getApp(): Application {
    return this.app;
  }
}
