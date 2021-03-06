import lodash from "lodash";

import { ForecastPoint, StormGlass } from "@src/clients/stormGlass";
import { InternalError } from "@src/util/errors/internal-error";

import { Beach } from "@src/models/beach";
import logger from "@src/logger";
import { Rating } from "./rating";

export interface BeachForecast extends Omit<Beach, "user">, ForecastPoint {}

export interface TimeForecast {
  time: string;
  forecast: Array<BeachForecast>;
}

export class ForecastProcessingInternalError extends InternalError {
  constructor(message: string) {
    super(`Unexpected error during the forecast processing: ${message}`);
  }
}

export class Forecast {
  constructor(
    protected stormGlass = new StormGlass(),
    protected RatingService: typeof Rating = Rating
  ) {}

  public async processForecastForBeaches(
    beaches: Array<Beach>
  ): Promise<Array<TimeForecast>> {
    logger.info(`Preparing the forecast for ${beaches.length} beaches`);
    try {
      const beachForecast = await this.calculateRating(beaches);
      const timeForecast = this.mapForecastByTyme(beachForecast);

      const orderedTimeForecast = timeForecast.map((t) => ({
        time: t.time,
        forecast: lodash.orderBy(t.forecast, ["rating"], ["desc"]),
      }));

      return orderedTimeForecast;
    } catch (error) {
      logger.error(error);
      throw new ForecastProcessingInternalError(error.message);
    }
  }

  private async calculateRating(
    beaches: Array<Beach>
  ): Promise<Array<BeachForecast>> {
    const pointsWithCorrectSources: Array<BeachForecast> = [];

    for (const beach of beaches) {
      const rating = new this.RatingService(beach);
      const points = await this.stormGlass.fetchPoints(beach.lat, beach.lng);

      const enrichedBeachData = this.enrichedBeachData(points, beach, rating);

      pointsWithCorrectSources.push(...enrichedBeachData);
    }

    return pointsWithCorrectSources;
  }

  private enrichedBeachData(
    points: Array<ForecastPoint>,
    beach: Beach,
    rating: Rating
  ): Array<BeachForecast> {
    return points.map((point) => ({
      ...{
        lat: beach.lat,
        lng: beach.lng,
        name: beach.name,
        position: beach.position,
        rating: rating.getRateForPoint(point),
      },
      ...point,
    }));
  }

  private mapForecastByTyme(
    forecast: Array<BeachForecast>
  ): Array<TimeForecast> {
    const forecastByTime: Array<TimeForecast> = [];

    for (const point of forecast) {
      const timePoint = forecastByTime.find((f) => f.time === point.time);

      if (timePoint) {
        timePoint.forecast.push(point);
      } else {
        forecastByTime.push({
          time: point.time,
          forecast: [point],
        });
      }
    }

    return forecastByTime;
  }
}
