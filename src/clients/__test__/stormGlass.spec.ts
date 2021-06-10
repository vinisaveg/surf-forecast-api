import { StormGlass } from "@src/clients/stormGlass";

describe("StormGlass Client", () => {
  it("Should return the normalized forecast from StormGlass Service", async () => {
    const lat = -33.79234;
    const lng = 151.29453;

    const stormGlass = new StormGlass();
    const response = await stormGlass.fetchPoints(lat, lng);

    expect(response).toEqual({});
  });
});
