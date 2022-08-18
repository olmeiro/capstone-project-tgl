const app = require("../../app");
const request = require("supertest");

describe("GET /comments from a post", () => {
  test("should response with a 200 status code", async () => {
    const response = await request(app).get("/comments/bypost/3").send();
    expect(response.statusCode).toBe(200);
  });

  test("should response an Object", async () => {
    const response = await request(app).get("/comments/bypost/3").send();
    expect(response.body).toBeInstanceOf(Object);
  });

  test("should response a content-type: application/json; charset=utf-8", async () => {
    const response = await request(app).get("/user/all").send();
    expect(response.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
  });
});

describe("POST / make a comment to a post", () => {
  test("should response with a 200 status code", async () => {
    const response = await request(app).post("/comments").send({
      comment: "comentario probrando test",
      userId: 1,
      postId: 1,
    });
    expect(response.statusCode).toBe(200);
  });

  test("should response an Object", async () => {
    const response = await request(app).post("/comments").send();
    expect(response.body).toBeInstanceOf(Object);
  });

  test("should response a content-type: application/json; charset=utf-8", async () => {
    const response = await request(app).post("/comments").send();
    expect(response.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
  });
});

describe("PUT /user", () => {
  test("should response with a 200 status code", async () => {
    const response = await request(app).put("/comments").send({
      newComment: " este es un nuevo comentario editado",
      commentId: 3,
    });
    expect(response.statusCode).toBe(200);
  });

  test("should response a content-type: application/json; charset=utf-8", async () => {
    const response = await request(app).put("/comments").send();
    expect(response.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
  });
});

describe("DELETE /posts", () => {
  test("should response with a 200 status code", async () => {
    const response = await request(app).delete("/comments/1").send();
    expect(response.statusCode).toBe(200);
  });

  test("should response a content-type: application/json; charset=utf-8", async () => {
    const response = await request(app).delete("/comments/1").send();
    expect(response.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
  });
});
