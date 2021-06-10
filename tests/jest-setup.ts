import { SetupServer } from "@src/server";
import supertest from "supertest";

beforeAll(() => {
  const testServer = new SetupServer();

  testServer.init();

  global.testRequest = supertest(testServer.getApp());
});
