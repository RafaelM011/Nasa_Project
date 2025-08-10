import app from "#root/app.js";
import request from "supertest";
import { connectMongo, disconnectMongo } from "#root/services/mongo.js";

describe("Launches API", () => {
  beforeAll( async() => await connectMongo());
  afterAll( async() => await disconnectMongo());

  describe("Test GET /launches", () => {
    test("Should respond with status 200", async () => {
      await request(app)
        .get("/launches")
        .expect("Content-Type", /json/)
        .expect(200)
    });
  });

  describe("Test POST /launches", function(){
    test("Should respond with status 201", async () => {
      await request(app)
      .post("/launches")
      .send({
        mission: "USS Enterprise",
        rocket: "NCC 1701-D",
        target: "Kepler-186 f",
        launchDate: "January 4, 2028"
      })
      .expect("Content-Type", /json/)
      .expect(201);
    });

    test("Should catch required properties", async () => {
      const response = await request(app)
      .post("/launches")
      .send({
        rocket: "NCC 1701-D",
        target: "Kepler-186 f",
        launchDate: "January 4, 2028"
      })
      .expect("Content-Type", /json/)
      .expect(400);

      expect(response.body).toStrictEqual({error: "Missing launch properties"})
    });

    test("Should catch invalid date", async () => {
      const response = await request(app)
      .post("/launches")
      .send({
        mission: "USS Enterprise",
        rocket: "NCC 1701-D",
        target: "Kepler-186 f",
        launchDate: "tomorrow"
      })
      .expect("Content-Type", /json/)
      .expect(400);

      expect(response.body).toStrictEqual({error: "Invalid date format"})
    });
  });
});
