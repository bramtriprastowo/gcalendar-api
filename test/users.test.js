const request = require("supertest");
const app = require("../index.js");
const mongoose = require("mongoose");

afterAll(async () => {
  await mongoose.connection.collections.users.deleteOne({ name: "Bram" });
  mongoose.connection.close();
});

describe("Endpoint GET /users", () => {
  // Success get all users
  it("should get all users", async function () {
    const response = await request(app).get("/api/v1/users");
    const { body, status } = response;
    expect(status).toBe(200);
    expect(Array.isArray(body.data)).toBe(true);
  });
});

describe("Endpoint POST /register", () => {
  // Success to register
  try {
    it("should register a user", async function () {
      const response = await request(app).post("/api/v1/users/register").send({
        name: "Bram",
        email: "bram@gmail.com",
        password: "bram123",
        passwordConfirmation: "bram123",
      });
      const { body, status } = response;
      const { data } = body;
      expect(status).toBe(201);
      expect(data).toHaveProperty("name", "Bram");
      expect(data).toHaveProperty("email", "bram@gmail.com");
      expect(data).toHaveProperty("_id", expect.any(String));
    });
  } catch (error) {}
});

