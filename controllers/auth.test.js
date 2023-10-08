const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const { User } = require("../models/user");
require("dotenv").config();

const { DB_HOST_TEST, PORT_TEST } = process.env;

const validUser = {
  email: "test1@gmail.com",
  password: "1234567",
};

const invalidUser = {
  email: "tesasdasdt1@gmail.com",
  password: "123456",
};

describe("Test login controller", () => {
  let server;
  let response;
  let responseError;

  beforeAll(async () => {
    server = app.listen(PORT_TEST);
    await mongoose.connect(DB_HOST_TEST).then();

    await request(app).post("/api/users/register").send(validUser);
    const user = await User.findOne({ email: validUser.email });

    await request(app).get(`/api/users/verify/${user.verificationToken}`);
    response = await request(app).post("/api/users/login").send(validUser);
    responseError = await request(app)
      .post("/api/users/login")
      .send(invalidUser);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await server.close();
    await mongoose.connection.close();
  });
  test("status code - 200", () => {
    expect(response.statusCode).toBe(200);
  });

  test("response body have property token", () => {
    expect(response.body).toHaveProperty("token");
  });

  test("response body have property user", () => {
    expect(response.body).toHaveProperty("user");
  });

  test("response body have property user with type object", () => {
    expect(typeof response.body.user).toBe("object");
  });

  test("object user have property email", () => {
    expect(response.body.user).toHaveProperty("email");
  });

  test("object user have property email with type string", () => {
    expect(typeof response.body.user.email).toBe("string");
  });

  test("object user have property subscription", () => {
    expect(response.body.user).toHaveProperty("subscription");
  });

  test("object user have property subscription with type string", () => {
    expect(typeof response.body.user.subscription).toBe("string");
  });

  test("status code - 401", async () => {
    expect(responseError.statusCode).toBe(401);
  });

  test("response body have property message with text - Email or password is wrong", async () => {
    expect(responseError.body.message).toBe("Email or password is wrong");
  });
});
