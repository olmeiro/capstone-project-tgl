const app = require("../../app");
const request = require("supertest");

describe("GET /favorites from a user", () => {
  test("should response with a 200 status code", async () => {
    const response = await request(app).get("/favorites/7").send();
    expect(response.statusCode).toBe(200);
  });

  test("should response an Object", async () => {
    const response = await request(app).get("/favorites/7").send();
    expect(response.body).toBeInstanceOf(Object);
  });

  test("should response a content-type: application/json; charset=utf-8", async () => {
    const response = await request(app).get("/favorites/7").send();
    expect(response.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
  });
});

describe("POST / add a favorite", () => {
  test("should response with a 200 status code", async () => {
    const response = await request(app)
      .post("/favorites?postId=5&userId=1")
      .send();
    expect(response.statusCode).toBe(200);
  });

  test("should response an Object", async () => {
    const response = await request(app)
      .post("/favorites?postId=5&userId=1")
      .send();
    expect(response.body).toBeInstanceOf(Object);
  });

  test("should response a content-type: application/json; charset=utf-8", async () => {
    const response = await request(app)
      .post("/favorites?postId=5&userId=1")
      .send();
    expect(response.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
  });
});

describe("DELETE / delete a favorite", () => {
  test("should response with a 200 status code", async () => {
    const response = await request(app)
      .delete("/favorites?postId=1&userId=1")
      .send();
    expect(response.statusCode).toBe(200);
  });

  test("should response a content-type: application/json; charset=utf-8", async () => {
    const response = await request(app)
      .delete("/favorites?postId=1&userId=1")
      .send();
    expect(response.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
  });
});
