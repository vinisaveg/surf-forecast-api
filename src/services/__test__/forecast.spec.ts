import { StormGlass } from "@src/clients/stormGlass";
import stormGlassNormalizedResponseWeather3HoursFixture from "@tests/fixtures/stormglass_normalized_response_weather_3_hours.json";
import { Forecast, ForecastProcessingInternalError } from "../forecast";

import { Beach, BeachPosition } from "@src/models/beach";

jest.mock("@src/clients/stormGlass");

describe("Forecast Service", () => {
  const mockedStormGlassService = new StormGlass() as jest.Mocked<StormGlass>;

  it("Should return the forecast for a list of beaches", async () => {
    mockedStormGlassService.fetchPoints.mockResolvedValue(
      stormGlassNormalizedResponseWeather3HoursFixture
    );

    const beaches: Array<Beach> = [
      {
        lat: -33.792726,
        lng: 151.289824,
        name: "Manly",
        position: BeachPosition.E,
      },
    ];

    const expectedResponse = [
      {
        time: "2020-04-26T00:00:00+00:00",
        forecast: [
          {
            lat: -33.792726,
            lng: 151.289824,
            name: "Manly",
            position: "E",
            rating: 1,
            swellDirection: 64.26,
            swellHeight: 0.15,
            swellPeriod: 3.89,
            time: "2020-04-26T00:00:00+00:00",
            waveDirection: 231.38,
            waveHeight: 0.47,
            windDirection: 299.45,
            windSpeed: 100,
          },
        ],
      },
      {
        time: "2020-04-26T01:00:00+00:00",
        forecast: [
          {
            lat: -33.792726,
            lng: 151.289824,
            name: "Manly",
            position: "E",
            rating: 1,
            swellDirection: 123.41,
            swellHeight: 0.21,
            swellPeriod: 3.67,
            time: "2020-04-26T01:00:00+00:00",
            waveDirection: 232.12,
            waveHeight: 0.46,
            windDirection: 310.48,
            windSpeed: 100,
          },
        ],
      },
      {
        time: "2020-04-26T02:00:00+00:00",
        forecast: [
          {
            lat: -33.792726,
            lng: 151.289824,
            name: "Manly",
            position: "E",
            rating: 1,
            swellDirection: 182.56,
            swellHeight: 0.28,
            swellPeriod: 3.44,
            time: "2020-04-26T02:00:00+00:00",
            waveDirection: 232.86,
            waveHeight: 0.46,
            windDirection: 321.5,
            windSpeed: 100,
          },
        ],
      },
    ];

    const forecast = new Forecast(mockedStormGlassService);
    const beachesWithRating = await forecast.processForecastForBeaches(beaches);

    expect(beachesWithRating).toEqual(expectedResponse);
  });

  it("Should return an empty list when beaches array are empty", async () => {
    const forecast = new Forecast();

    const response = await forecast.processForecastForBeaches([]);

    expect(response).toEqual([]);
  });

  it("Should throw internal processing error when something goes wrong during the rating process", async () => {
    const beaches: Array<Beach> = [
      {
        lat: -33.792726,
        lng: 151.289824,
        name: "Manly",
        position: BeachPosition.E,
      },
    ];

    mockedStormGlassService.fetchPoints.mockRejectedValue(
      "Error fetching data"
    );

    const forecast = new Forecast(mockedStormGlassService);
    await expect(forecast.processForecastForBeaches(beaches)).rejects.toThrow(
      ForecastProcessingInternalError
    );
  });
});
