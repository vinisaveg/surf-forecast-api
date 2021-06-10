import axios from "axios";

import { StormGlass } from "@src/clients/stormGlass";

import stormGlassWeather3HoursFixture from "@tests/fixtures/stormglass_weather_3_hours.json";
import stormGlassNormalizedResponseWeather3HoursFixture from "@tests/fixtures/stormglass_normalized_response_weather_3_hours.json";

jest.mock("axios");

describe("StormGlass Client", () => {
  it("Should return the normalized forecast from StormGlass Service", async () => {
    const lat = -33.79234;
    const lng = 151.29453;

    axios.get = jest.fn().mockResolvedValue(stormGlassWeather3HoursFixture);

    const stormGlass = new StormGlass(axios);
    const response = await stormGlass.fetchPoints(lat, lng);

    expect(response).toEqual(stormGlassNormalizedResponseWeather3HoursFixture);
  });
});
