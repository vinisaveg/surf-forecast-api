import { Controller, Get } from "@overnightjs/core";
import { Request, Response } from "express";

import { Forecast } from "@src/services/forecast";
import { Beach } from "@src/models/beach";

const forecast = new Forecast();
@Controller("forecast")
export class ForecastController {
  @Get("")
  public async getForecastForLoggedUser(
    _: Request,
    response: Response
  ): Promise<void> {
    try {
      const beaches = await Beach.find();

      const forecastData = await forecast.processForecastForBeaches(beaches);

      response.status(200).send(forecastData);
    } catch (error) {
      response.status(500).send({ error: "Something went wrong" });
    }
  }
}
