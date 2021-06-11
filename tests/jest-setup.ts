import { SetupServer } from "@src/server";
import supertest from "supertest";

let testServer: SetupServer;

beforeAll(async () => {
  testServer = new SetupServer();

  await testServer.init();

  global.testRequest = supertest(testServer.getApp());
});

afterAll(async () => {
  await testServer.close();
});
